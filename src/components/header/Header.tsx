import React from "react";
import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../router/paths";
import { clearLocalStorage, getLocalUserInfo } from "../../utils/storage";
import person from "../../assets/person.png";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { resetState as resetAuthState } from "../../store/auth/auth.slice";

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = getLocalUserInfo();

  const onHandleLogout = () => {
    navigate(`${PATHS.LOGIN}`);
    clearLocalStorage();
    dispatch(resetAuthState());
  };

  return (
    <AppBar className={styles.appBar} position="fixed">
      <Toolbar className={styles.toolbar}>
        {userInfo ? (
          <Link to={PATHS.PROFILE} className={styles.profileLink}>
            <Box ml={1} display="flex" alignItems="center" gap={1}>
              <Avatar src={userInfo?.image || person} />
              <i>{userInfo.username}</i>
            </Box>
          </Link>
        ) : (
          <Link to="/" className={styles.link}>
            Article
          </Link>
        )}
        {userInfo ? (
          <Typography
            variant="h6"
            color="white"
            className={styles.logout}
            onClick={() => onHandleLogout()}
          >
            Logout
          </Typography>
        ) : (
          <Link to={`/${PATHS.LOGIN}`} className={styles.link}>
            Login now
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
