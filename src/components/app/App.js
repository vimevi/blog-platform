import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../header";
import ArticleList from "../article-list";
import NewAccountForm from "../form-items/new-account-form";
import EditProfileForm from "../form-items/edit-profile-form";
import LoginForm from "../form-items/login-form";
import ArticleForm from "../form-items/article-form";
import ArticlePage from "../article-page";
import PrivateRoutes from "../../utils/router/privateRouter";
import "./app.module.scss";

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="register" element={<NewAccountForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route element={<PrivateRoutes />}>
            <Route path="new-article" element={<ArticleForm />} />
            <Route path="profile" element={<EditProfileForm />} />
          </Route>
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="articles/:slug/edit" element={<ArticleForm />} />
          <Route
            path="*"
            element={<h3 className="spin">Nothing was found: 404!</h3>}
          />
        </Routes>
      </Router>
    </div>
  );
}
