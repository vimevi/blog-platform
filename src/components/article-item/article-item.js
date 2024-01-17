import { useState } from 'react';
import styles from './article-item.module.scss';
import { format, parseISO } from 'date-fns';
import { NavLink } from 'react-router-dom';
import * as utils from '../../utils/utils';

export default function ArticleItem({
	title,
	likeCount,
	tags,
	desc,
	author,
	date,
	avatar,
	isLoggedIn,
	slug,
}) {
	const [like, setLike] = useState(false);
	const [likes, setLikeCount] = useState(likeCount);

	const parsedDate = parseISO(date);
	const formattedDate = format(parsedDate, 'MMMM d, yyyy, p');
	//
	function handleLike() {
		setLike(!like);
		setLikeCount((prevLikes) => (like ? prevLikes - 1 : prevLikes + 1));
	}
	const likeClassName = like
		? `${styles.likeCount} ${styles.liked}`
		: styles.likeCount;

	return (
		<li className={styles.ArticleItem}>
			<div>
				<div className={styles.firstLine}>
					<NavLink to={`/articles/${slug}`}>
						<h5 className={styles.title}>{utils.truncateTextAtWord(title, 64)}</h5>
					</NavLink>

					<button
						disabled={!isLoggedIn}
						className={likeClassName}
						onClick={handleLike}
					>
						{likes}
					</button>
				</div>
				<div className={styles.tags}>
					{tags.map((tag, index) => (
						<span key={index} className={styles.tag}>
							{utils.truncateTextAtWord(tag, 40)}
						</span>
					))}
				</div>
				<p className={styles.desc}>{utils.truncateTextAtWord(desc, 100)}</p>
			</div>
			<div className={styles.authorBlock}>
				<div className={styles.authorInfo}>
					<h6 className={styles.author}>{author}</h6>
					<span className={styles.date}>{formattedDate}</span>
				</div>
				<div className={styles.avatar}>
					<img className={styles.avatarImg} src={avatar} alt="avatar" />
				</div>
			</div>
		</li>
	);
}
