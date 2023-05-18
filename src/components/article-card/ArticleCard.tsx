import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { ArticleDTO } from "../../model/article/dto/article.dto";
import styles from "./ArticleCard.module.scss";
import person from "../../assets/person.png";
import { Link } from "react-router-dom";
import { PATHS } from "../../router/paths";
import { convertSecondToDate } from "../../utils/helper";

const ArticleCard: React.FC<{
  article: ArticleDTO;
}> = ({ article }) => {
  return (
    <Grid item key={article.id} xs={12} sm={6} md={4}>
      <Card className={styles.card}>
        <Link
          to={`/${PATHS.ARTICLE_DETAIL}/${article.slug}`}
          className={styles.link}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="black"
              >
                {article.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {article.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions className={styles.cardActions}>
          <Box className={styles.author}>
            <Box ml={1} display="flex" alignItems="center">
              <Avatar src={article.author?.image || person} />
              <Typography ml={1} variant="subtitle2" component="p">
                {article.author?.username || "Anynomous"}
              </Typography>
            </Box>
            <Box ml={2}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
              >
                Created at: {convertSecondToDate(article.created)}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
              >
                Last update: {convertSecondToDate(article.updated)}
              </Typography>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArticleCard;
