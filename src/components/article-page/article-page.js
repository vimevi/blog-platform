import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../article-item/article-item.module.scss";

import { fetchFullArticle } from "../../redux/slices/article-slice";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { articleDeleter } from "../../redux/slices/article-control-slice";
import Markdown from "markdown-to-jsx";
import {
  articleLike,
  articleDislike,
} from "../../redux/slices/article-control-slice";
import { message, Popconfirm } from "antd";
import Loading from "../loading";

export default function ArticlePage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { article } = useSelector((store) => store.article);
  const { token, username = "" } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const [isMyArticle, setIsMyArticle] = useState(false);

  const [like, setLike] = useState(article.favorited);
  const [likes, setLikeCount] = useState(article.favoritesCount);

  useEffect(() => {
    return () => {
      setIsMyArticle(false);
    };
  }, []);

  useEffect(() => {
    if (slug) {
      dispatch(fetchFullArticle(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    setLike(article.favorited);
    setLikeCount(article.favoritesCount);
  }, [article]);

  useEffect(() => {
    if (article && article.author && article.author.username === username) {
      setIsMyArticle(true);
    } else {
      setIsMyArticle(false);
    }
  }, [setIsMyArticle, username, article]);

  const handleLike = () => {
    if (!token) {
      return;
    }

    try {
      if (!like) {
        dispatch(articleLike({ token, slug }));
        setLikeCount((prevLikes) => prevLikes + 1);
      } else {
        dispatch(articleDislike({ token, slug }));
        setLikeCount((prevLikes) => prevLikes - 1);
      }

      setLike(!like);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (
    !article ||
    !article.title ||
    !article.createdAt ||
    !article.author ||
    !article.tagList ||
    !article.description
  ) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const parsedDate = parseISO(article.createdAt);
  const formattedDate = format(parsedDate, "MMMM d, yyyy, p");

  const confirmConfig = {
    title: "Are you sure you want to delete this article?",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onConfirm() {
      dispatch(articleDeleter({ token, slug }));
      // 0.5 сек делей для прогрузки нового массива articles
      message.loading("Article deleted", [1]);
      setTimeout(() => navigate("/articles"), 500);
      setIsMyArticle(false);
    },
    onCancel() {
      message.info("Deletion cancelled");
    },
  };
  const renderClass = (like) => {
    return like ? `${styles.likeCount} ${styles.liked}` : styles.likeCount;
  };

  return (
    <div className="container">
      <section className={styles.ArticleItem}>
        <div>
          <div className={styles.firstLine}>
            <h5 className={styles.title}>{article.title}</h5>

            <button
              disabled={!token}
              className={renderClass(article.favorited)}
              onClick={handleLike}
            >
              {likes}
            </button>
          </div>
          <div className={styles.tags}>
            {article.tagList.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <p className={`${styles.desc} ${styles.descFull}`}>
            {article.description}
          </p>
          {article.body ? (
            <Markdown className={styles.markdownBody}>{article.body}</Markdown>
          ) : null}
        </div>
        <div className={styles.authorBlock}>
          <div className={styles.authorInfo}>
            <h6 className={styles.author}>{article.author.username}</h6>
            <span className={styles.date}>{formattedDate}</span>
          </div>
          <div className={styles.avatar}>
            <img
              className={styles.avatarImg}
              src={article.author.image}
              alt="avatar"
            />
            {isMyArticle && (
              <div className={styles.buttonBlock}>
                <Popconfirm placement="bottom" {...confirmConfig}>
                  <button className={styles.delete}>Delete</button>
                </Popconfirm>
                <NavLink to={`/articles/${slug}/edit`} tabIndex={-1}>
                  <button className={styles.edit}>Edit</button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
