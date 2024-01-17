import { useDispatch, useSelector } from 'react-redux';
import styles from '../article-item/article-item.module.scss';
import Markdown from 'markdown-to-jsx';

import React, { useEffect } from 'react';
import { fetchFullArticle } from '../../redux/slices/article-slice';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import Loading from '../loading';

export default function ArticlePage() {
	const dispatch = useDispatch();
	const { article, loading, error } = useSelector((store) => store.article);
	const { slug } = useParams();

	useEffect(() => {
		if (slug) {
			dispatch(fetchFullArticle(slug));
		}
	}, [dispatch, slug]);
	if (!article || !article.article || loading) {
		return <Loading></Loading>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const {
		body,
		createdAt,
		description,
		favoritesCount,
		favoreited,
		tagList,
		title,
	} = article?.article;
	const { username, image } = article?.article.author;

	const parsedDate = parseISO(createdAt);
	const formattedDate = format(parsedDate, 'MMMM d, yyyy, p');
	console.log(article);
	const likeClassName = article.favoritesCount
		? `${styles.likeCount} ${styles.liked}`
		: styles.likeCount;
	return (
		<div className="container">
			<section className={styles.ArticleItem}>
				<div>
					<div className={styles.firstLine}>
						<h5 className={styles.title}>{title}</h5>

						<button
							disabled={true}
							className={likeClassName}
							// onClick={handleLike}
						>
							{favoritesCount}
						</button>
					</div>
					<div className={styles.tags}>
						{tagList.map((tag, index) => (
							<span key={index} className={styles.tag}>
								{tag}
							</span>
						))}
					</div>
					<p className={`${styles.desc} ${styles.descFull}`}>{description}</p>
					<Markdown className={styles.markdownBody}>{body}</Markdown>
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
			</section>
		</div>
	);
}
