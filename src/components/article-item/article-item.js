import { useState } from "react";
import styles from "./article-item.module.scss";
import { format, parseISO } from "date-fns";
import { NavLink } from "react-router-dom";
import * as utils from "../../utils/general-utils/utils";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  articleLike,
  articleDislike,
} from "../../redux/slices/article-control-slice";

export default function ArticleItem({
  title,
  favoritesCount,
  tagList,
  description,
  username,
  createdAt,
  image,
  favorited,
  slug,
}) {
  const [like, setLike] = useState(favorited);
  const [likes, setLikeCount] = useState(favoritesCount);

  const { token } = useSelector((store) => store.user);

  const dispatch = useDispatch();
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
      throw new Error(error);
    }
  };

  const parsedDate = parseISO(createdAt);
  const formattedDate = format(parsedDate, "MMMM d, yyyy, p");

  const likeClassName = like
    ? `${styles.likeCount} ${styles.liked}`
    : styles.likeCount;

  return (
    <li className={styles.ArticleItem}>
      <div>
        <div className={styles.firstLine}>
          <NavLink to={`/articles/${slug}`}>
            <h5 className={styles.title}>
              {utils.truncateTextAtWord(title, 100)}
            </h5>
          </NavLink>

          <button
            disabled={!token}
            className={likeClassName}
            onClick={handleLike}
          >
            {likes}
          </button>
        </div>
        <div className={styles.tags}>
          {tagList.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {utils.truncateTextAtWord(tag, 40)}
            </span>
          ))}
        </div>
        <p className={styles.desc}>
          {utils.truncateTextAtWord(description, 240)}
        </p>
      </div>
      <div className={styles.authorBlock}>
        <div className={styles.authorInfo}>
          <h6 className={styles.author}>{username}</h6>
          <span className={styles.date}>{formattedDate}</span>
        </div>
        <div className={styles.avatar}>
          <img className={styles.avatarImg} src={image} alt="avatar" />
        </div>
      </div>
    </li>
  );
}

ArticleItem.propTypes = {
  title: PropTypes.string,
  favoritesCount: PropTypes.number,
  tagList: PropTypes.array,
  description: PropTypes.string,
  username: PropTypes.string,
  createdAt: PropTypes.any,
  image: PropTypes.string,
  favorited: PropTypes.bool,
  slug: PropTypes.string,
};
