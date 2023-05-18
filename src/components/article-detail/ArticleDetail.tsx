import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./ArticleDetail.module.scss";
import { ArticleDTO } from "../../model/article/dto/article.dto";
import { convertSecondToDate } from "../../utils/helper";

const ArticleDetail: React.FC<{
  article: ArticleDTO;
}> = ({ article }) => {
  return (
    <Box className={styles.contentContainer}>
      <Typography variant="h5" mt={4} fontWeight="bold">
        {article.title}
      </Typography>
      <Box
        className={styles.dateContainer}
        display="flex"
        justifyContent="space-around"
        marginY={2}
      >
        <Typography component="p" color="textSecondary">
          Created at: {convertSecondToDate(article.created)}
        </Typography>
        <Typography component="p" color="textSecondary">
          Upadted: {convertSecondToDate(article.updated)}
        </Typography>
      </Box>
      <Box>
        <p dangerouslySetInnerHTML={{ __html: article.body || "" }}></p>
      </Box>
    </Box>
  );
};

export default ArticleDetail;
