import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../header";
import ArticleList from "../article-list";
import NewAccountForm from "../form-items/new-account-form";
import EditProfileForm from "../form-items/edit-profile-form";
import LoginForm from "../form-items/login-form";
import ArticleForm from "../form-items/article-form";
import ArticlePage from "../article-page";
import PrivateRoutes from "../../utils/router/privateRouter";
import * as path from "../../utils/router/paths";
import "./app.module.scss";

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path={path.articlesPath} element={<ArticleList />} />
          <Route path={path.registerPath} element={<NewAccountForm />} />
          <Route path={path.loginPath} element={<LoginForm />} />
          <Route element={<PrivateRoutes />}>
            <Route path={path.newArticlePath} element={<ArticleForm />} />
            <Route path={path.profilePath} element={<EditProfileForm />} />
            <Route path={path.editArticlePath} element={<ArticleForm />} />
          </Route>
          <Route path={path.articlePath} element={<ArticlePage />} />
          <Route
            path="*"
            element={<h3 className="spin">Nothing was found: 404!</h3>}
          />
        </Routes>
      </Router>
    </div>
  );
}
