import React from "react";
import { Box, Container } from "@mui/material";

import Header from "../../components/header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { PATHS } from "../../router/paths";
import styles from "./Home.module.scss";
import { getLocalUserInfo } from "../../utils/storage";

const Home = () => {
  const location = useLocation();
  const userInfo = getLocalUserInfo();

  return (
    <>
      <Header />
      <Container maxWidth="xl" className={styles.container}>
        {userInfo && (
          <Box display="flex" justifyContent="space-evenly">
            <Link
              to={PATHS.ARTICLES}
              className={
                location.pathname.includes(PATHS.ARTICLES)
                  ? styles.active
                  : undefined
              }
              style={{
                padding: "10px 50px",
                textDecoration: "none",
                borderRadius: "6px",
              }}
            >
              Article
            </Link>
            <Link
              to={PATHS.USERS}
              style={{
                padding: "10px 50px",
                textDecoration: "none",
                borderRadius: "6px",
              }}
              className={
                location.pathname.includes(PATHS.USERS)
                  ? styles.active
                  : undefined
              }
            >
              Users
            </Link>
          </Box>
        )}
        <Outlet />
      </Container>
    </>
  );
};

export default Home;
