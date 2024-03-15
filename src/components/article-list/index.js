import { useEffect } from "react";

import { fetchArticles, changePage } from "../../redux/slices/article-slice";

import defaultAvatar from "../../assets/images/avatar.png";
import { Pagination, Alert } from "antd";
import ArticleItem from "../article-item";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus } from "../../redux/slices/article-control-slice";
import Loading from "../loading";
import { clearRegisterData } from "../../redux/slices/user-slice";
import "./article-list.module.scss";

export default function ArticleList() {
  const dispatch = useDispatch();

  const { articles, articlesCount, error, currentPage, loading } = useSelector(
    (state) => state.article,
  );
  const { token } = useSelector((store) => store.user);
  useEffect(() => {
    dispatch(clearRegisterData());
    dispatch(resetStatus());
    if (token) {
      dispatch(fetchArticles({ page: currentPage, token }));
    } else {
      dispatch(fetchArticles({ page: currentPage }));
    }
  }, [dispatch, currentPage, token]);

  const handlePageChange = async (pageNumber) => {
    dispatch(changePage(pageNumber));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={`Error: ${error}`} />;
  }

  return (
    <section>
      <div className="container">
        <ul>
          {!loading &&
            articles.map((article) => (
              <ArticleItem
                key={article.slug}
                username={article.author.username}
                image={article.author.image || defaultAvatar}
                createdAt={article.createdAt}
                title={article.title}
                favoritesCount={article.favoritesCount}
                tagList={article.tagList}
                description={article.description}
                text={article.text}
                slug={article.slug}
                favorited={article.favorited}
              />
            ))}
        </ul>
        <Pagination
          pageSize="10"
          style={{ textAlign: "center", marginBottom: 30 }}
          current={currentPage}
          total={articlesCount}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </div>
    </section>
  );
}
