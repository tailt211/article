import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  fetchProfileThunk,
  updateProfileThunk,
} from "../../store/profile/profile.thunk";
import { setLocalUserInfo } from "../../utils/storage";
import { updateMyProfile } from "../../store/users/users.slice";
import { UserDTO } from "../../model/user/dto/user.dto";

interface FormInputs {
  username: string;
  email: string;
  bio?: string | null;
}

const ProfilePage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { myProfile } = useSelector((state: RootState) => state.profile);

  const [isEdit, setIsEdit] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(myProfile?.image || "");
  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      username: myProfile?.username,
      email: myProfile?.email,
      bio: myProfile?.bio,
    },
  });

  useEffect(() => {
    dispatch(fetchProfileThunk());
  }, [dispatch]);

  const onSubmit = async (data: FormInputs) => {
    if (myProfile && data) {
      dispatch(
        updateProfileThunk({
          username: data.username,
          email: data.email,
          bio: data.bio || "",
          image: avatar || "",
        })
      );
      dispatch(
        updateMyProfile({
          id: myProfile.id,
          username: data.username,
          email: data.email,
          bio: data.bio || "",
          image: avatar || "",
        } as UserDTO)
      );
      setLocalUserInfo({
        email: data?.email,
        username: data?.username,
        image: avatar,
      });
      setIsEdit(false);
    }
  };

  const handleUpload = async (e: any) => {
    if (e.target.files[0]) {
      const convertBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      const base64Image = await convertBase64(e.target.files[0]);
      setAvatar(base64Image);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      margin="30px auto"
      maxWidth="500px"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} marginBottom={4}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            marginBottom={2}
          >
            {isEdit && (
              <input
                style={{ display: "none" }}
                type="file"
                value=""
                id="upload-avatar"
                onChange={handleUpload}
              />
            )}
            <label htmlFor="upload-avatar">
              <Avatar
                src={avatar || ""}
                sx={{
                  minWidth: "150px",
                  minHeight: "150px",
                  cursor: "pointer",
                }}
              />
              <Typography
                sx={{
                  marginTop: "4px",
                  cursor: "pointer",
                }}
                color="GrayText"
              >
                UPLOAD
              </Typography>
            </label>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              placeholder="Enter email"
              label="Email"
              variant="outlined"
              fullWidth
              disabled
              {...register("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              placeholder="Enter username"
              label="Username"
              variant="outlined"
              fullWidth
              required
              disabled={!isEdit}
              {...register("username")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bio"
              multiline
              rows={6}
              disabled={!isEdit}
              placeholder="Type the your bio here"
              variant="outlined"
              fullWidth
              {...register("bio")}
            />
          </Grid>
          <Grid item xs={12}>
            {isEdit && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
      {!isEdit && (
        <Button
          variant="contained"
          color="inherit"
          fullWidth
          onClick={(e) => {
            setIsEdit(true);
          }}
        >
          Edit
        </Button>
      )}
    </Box>
  );
};

export default ProfilePage;
