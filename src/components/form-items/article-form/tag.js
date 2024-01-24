import styles from "./article-form.module.scss";
import PropTypes from "prop-types";

export default function Tag({ tag, onDelete }) {
  return (
    <div className={styles.divTag}>
      <div className={styles.tag}>{tag}</div>
      <button className={styles.deleteTag} onClick={onDelete} type="button">
        Delete
      </button>
    </div>
  );
}

Tag.propTypes = {
  tag: PropTypes.string,
  onDelete: PropTypes.func,
};
