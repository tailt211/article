import React, { useState } from "react";
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./Comment.module.scss";
import sendIcon from "../../assets/send-message.png";
import CommentList from "../comment-list/CommentList";
import { CommentDTO } from "../../model/comment/dto/comment.dto";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { postCommentThunk } from "../../store/comments/comment.thunk";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import NotFound from "../notFound/NotFound";
import { getLocalUserInfo } from "../../utils/storage";
import { Link } from "react-router-dom";
import { PATHS } from "../../router/paths";

const Comment: React.FC<{
  loading: boolean;
  commentList: CommentDTO[];
}> = ({ commentList, loading }) => {
  const dispatch: AppDispatch = useDispatch();
  const { slug } = useParams();
  const userInfo = getLocalUserInfo();
  const [comment, setComment] = useState("");

  const handlePostComment = () => {
    if (slug && comment) {
      dispatch(postCommentThunk({ slug: slug, body: comment }));
      setComment("");
    }
  };

  return (
    <Container
      maxWidth="sm"
      className={styles.container}
      sx={{ padding: "0px" }}
    >
      <Typography textAlign="left">Comments</Typography>

      {userInfo ? (
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            label="Comment"
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            multiline
            rows={2}
            placeholder="Type your comment here"
            variant="outlined"
            fullWidth
          />
          <IconButton
            className={styles.iconButton}
            onClick={() => handlePostComment()}
          >
            <Box component="img" src={sendIcon} className={styles.sendIcon} />
          </IconButton>
        </Box>
      ) : (
        <Link to={`/${PATHS.LOGIN}`}>Login to post comment</Link>
      )}
      {loading && <Loader />}
      {!loading && commentList.length === 0 && (
        <NotFound content="Don't have any comment" />
      )}
      {!loading && commentList.length > 0 && (
        <CommentList commentList={commentList} />
      )}
    </Container>
  );
};

export default Comment;
