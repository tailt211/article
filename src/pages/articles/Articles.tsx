import { Box, Button, Container, Grid } from "@mui/material";

import styles from "./Articles.module.scss";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { ArticleState } from "../../store/articles/articles.slice";
import ArticleCard from "../../components/article-card/ArticleCard";
import { Link } from "react-router-dom";
import { PATHS } from "../../router/paths";
import { getLocalUserInfo } from "../../utils/storage";
import Loader from "../../components/loader/Loader";
import NotFound from "../../components/notFound/NotFound";

const ArticleList: React.FC = () => {
  const userInfo = getLocalUserInfo();
  const { loading, articlesList } = useSelector(
    (state: RootState) => state.article
  ) as ArticleState;

  return (
    <Container maxWidth="lg" className={styles.container}>
      {userInfo && (
        <Box className={styles.linkContainer}>
          <Link to={`/${PATHS.ARTICLE_CREATE}`}>
            <Button variant="contained" color="primary">
              New Post
            </Button>
          </Link>
        </Box>
      )}
      <Grid container spacing={3} marginTop={1}>
        {loading && <Loader />}
        {!loading && articlesList.length === 0 && <NotFound />}
        {!loading &&
          articlesList.length > 0 &&
          articlesList.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
      </Grid>
    </Container>
  );
};

export default ArticleList;
