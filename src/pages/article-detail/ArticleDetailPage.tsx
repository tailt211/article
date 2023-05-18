import React, { useEffect } from "react";
import { Box, Button, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  ArticleState,
  removeArticle,
} from "../../store/articles/articles.slice";
import {
  deleteArticleThunk,
  fetchArticleThunk,
} from "../../store/articles/articlse.thunk";
import styles from "./ArticleDetailPage.module.scss";
import { Link } from "react-router-dom";
import { PATHS } from "../../router/paths";
import { getLocalUserInfo } from "../../utils/storage";
import Comment from "../../components/comment/Comment";
import { fetchAllCommentsThunk } from "../../store/comments/comment.thunk";
import Loader from "../../components/loader/Loader";
import ArticleDetail from "../../components/article-detail/ArticleDetail";

const ArticleDetailPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const userInfo = getLocalUserInfo();

  const dispatch: AppDispatch = useDispatch();

  const { loading, article } = useSelector(
    (state: RootState) => state.article
  ) as ArticleState;

  const { loading: commentLoading, commentList } = useSelector(
    (state: RootState) => state.comment
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchArticleThunk({ slug }));
      dispatch(fetchAllCommentsThunk({ slug }));
    }
  }, [slug, dispatch]);

  const handleRemoveArticle = () => {
    if (slug && article) {
      dispatch(deleteArticleThunk({ slug: slug }));
      dispatch(removeArticle(article));
      navigate(`/${PATHS.ARTICLES}`);
    }
  };
  return (
    <Container maxWidth="lg" className={styles.container}>
      {userInfo && (
        <Box className={styles.linkContainer} display="flex" gap={2}>
          <Link to={`/${PATHS.ARTICLE_UPDATE}/${slug}`}>
            <Button variant="contained" color="primary">
              Update
            </Button>
          </Link>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleRemoveArticle()}
          >
            Remove
          </Button>
        </Box>
      )}
      {loading && <Loader />}
      {!loading && article && <ArticleDetail article={article} />}
      <Comment commentList={commentList} loading={commentLoading} />
    </Container>
  );
};

export default ArticleDetailPage;
