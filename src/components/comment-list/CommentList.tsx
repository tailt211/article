import React from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import deleteIcon from "../../assets/delete-icon.png";
import { CommentDTO } from "../../model/comment/dto/comment.dto";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteCommentThunk } from "../../store/comments/comment.thunk";
import { convertSecondToDate } from "../../utils/helper";
import { getLocalUserInfo } from "../../utils/storage";

const CommentList: React.FC<{
  commentList: CommentDTO[];
}> = ({ commentList }) => {
  const dispatch: AppDispatch = useDispatch();
  const { slug } = useParams();
  const userInfo = getLocalUserInfo();

  const handleDeleteComment = (id: number) => {
    if (id && slug) {
      dispatch(deleteCommentThunk({ id: id, slug: slug }));
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        marginTop: "10px",
      }}
    >
      {commentList &&
        commentList.map((comment: CommentDTO) => (
          <ListItem
            key={comment.id}
            alignItems="flex-start"
            sx={{
              padding: "0px",
              marginY: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box display="flex" width="100%">
              <Box display="flex" width="100%" justifyContent="space-between">
                <ListItemAvatar>
                  <Avatar alt="avatar" src={comment.author.image || ""} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.author.username}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline", overflowWrap: "anywhere" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {comment.body}
                      </Typography>
                      {` — ${convertSecondToDate(comment.created)}`}
                    </>
                  }
                />
              </Box>
              {userInfo && (
                <IconButton onClick={() => handleDeleteComment(comment.id)}>
                  <Box component="img" src={deleteIcon} />
                </IconButton>
              )}
            </Box>
            <Divider sx={{ width: "100%", marginY: "8px" }} />
          </ListItem>
        ))}
    </List>
  );
};

export default CommentList;
