import styles from './article-form.module.scss';

export default function Tag({ tag, onDelete }) {
	return (
		<div className={styles.divTag}>
			<div className={styles.tag}>{tag}</div>
			<button className={styles.deleteTag} onClick={onDelete}>
				Delete
			</button>
		</div>
	);
}
