import React, { useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "./router/paths";
import LoginPage from "./pages/login/LoginPage";
import UsersPage from "./pages/users/UserPage";
import ArticleDetailPage from "./pages/article-detail/ArticleDetailPage";
import ArticleList from "./pages/articles/Articles";
import Home from "./pages/home/Home";
import CreateUpdateArticle from "./pages/article-update-create/CreateUpdateArticle";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { fetchAllArticlesThunk } from "./store/articles/articlse.thunk";
import { getLocalUserInfo } from "./utils/storage";
import RegisterPage from "./pages/register/RegisterPage";
import ProfilePage from "./pages/profile/Profile";
import { fetchProfileThunk } from "./store/profile/profile.thunk";
import { fetchAllUserThunk } from "./store/users/users.thunk";

function App() {
  const dispatch: AppDispatch = useDispatch();

  const userInfo = getLocalUserInfo();

  useEffect(() => {
    dispatch(fetchAllArticlesThunk());
    if (userInfo) {
      dispatch(fetchProfileThunk());
      dispatch(fetchAllUserThunk());
    }
  }, [userInfo, dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path=""
            element={<Navigate to={`/${PATHS.ARTICLES}`} replace />}
          />
          <Route path={PATHS.ARTICLES} element={<ArticleList />} />
          <Route path={PATHS.USERS} element={<UsersPage />} />
          <Route
            path={`${PATHS.ARTICLE_DETAIL}/:slug`}
            element={<ArticleDetailPage />}
          />
          <Route
            path={PATHS.ARTICLE_CREATE}
            element={<CreateUpdateArticle />}
          />
          <Route
            path={`${PATHS.ARTICLE_UPDATE}/:slug`}
            element={<CreateUpdateArticle />}
          />
          <Route path={PATHS.PROFILE} element={<ProfilePage />} />
        </Route>
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route path={PATHS.REGISTER} element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
