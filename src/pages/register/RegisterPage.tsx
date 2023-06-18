import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AuthState } from "../../store/auth/auth.slice";
import { RegisterThunk } from "../../store/auth/auth.thunk";
import { useNavigate } from "react-router-dom";
import { setLocalToken, setLocalUserInfo } from "../../utils/storage";
import { Link } from "react-router-dom";
import { PATHS } from "../../router/paths";
import { fetchProfileThunk } from "../../store/profile/profile.thunk";

interface FormInputs {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormInputs>();

  const { loading, token, myAccount } = useSelector(
    (state: RootState) => state.auth
  ) as AuthState;

  const onSubmit = async (data: FormInputs) => {
    dispatch(
      RegisterThunk({
        username: data.username,
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (token && myAccount && !loading) {
      setLocalToken(token);
      setLocalUserInfo({
        email: myAccount?.email,
        username: myAccount?.username,
        image: myAccount?.image,
      });
      navigate("/", { replace: true });
    }
    dispatch(fetchProfileThunk());
  }, [token, loading, myAccount, navigate, dispatch]);

  return (
    <Box mt={12}>
      <Typography gutterBottom variant="h3" align="center">
        Register Page
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1} marginBottom={4}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Enter username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("username")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Enter email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("email")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Enter password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("password")}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Enter confirm password"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    required
                    {...register("password")}
                  />
                </Grid> */}
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

            <Link to={`/${PATHS.LOGIN}`}>
              Already have an account? Login hear!
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default RegisterPage;
