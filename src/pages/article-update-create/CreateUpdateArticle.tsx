import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createArticleThunk,
  updateArticleThunk,
} from "../../store/articles/articlse.thunk";
import { PATHS } from "../../router/paths";
import { useSelector } from "react-redux";
import { ArticleState } from "../../store/articles/articles.slice";
import { parser } from "../../utils/helper";

interface FormInputs {
  title: string;
  description: string;
  body?: string | null;
}

const CreateUpdateArticle = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const isCreate = !slug ? true : false;
  const { article } = useSelector(
    (state: RootState) => state.article
  ) as ArticleState;

  const { register, handleSubmit } = useForm<FormInputs>(
    !isCreate
      ? {
          defaultValues: {
            title: article?.title,
            description: article?.description,
            body: parser(article?.body ?? ""),
          },
        }
      : {}
  );

  const onSubmit = async (data: FormInputs) => {
    if (isCreate) {
      dispatch(
        createArticleThunk({
          body: {
            title: data.title,
            description: data.description,
            body: `<p>${data.body}</p>`,
          },
        })
      );
      navigate(`/${PATHS.ARTICLES}`);
    } else if (!isCreate && slug) {
      dispatch(
        updateArticleThunk({
          slug: slug,
          body: {
            title: data.title,
            description: data.description,
            body: `<p>${data.body}</p>`,
          },
        })
      );
      navigate(`/${PATHS.ARTICLE_DETAIL}/${slug}`);
    }
  };

  return (
    <Box mt={6}>
      <Typography gutterBottom variant="h3" align="center">
        {slug ? "Update Article" : "Create New Article"}
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Enter article title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("title")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Enter description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("description")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Content"
                    multiline
                    rows={6}
                    placeholder="Type the article content here"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("body")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default CreateUpdateArticle;
