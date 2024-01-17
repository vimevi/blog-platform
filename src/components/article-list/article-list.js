import { useEffect } from 'react';

import { fetchArticles, changePage } from '../../redux/slices/article-slice';

import { Pagination, Alert } from 'antd';
import ArticleItem from '../article-item/article-item';
import defaultAvatar from '../../assets/images/avatar.png';
import { useDispatch, useSelector } from 'react-redux';

import styles from './article-list.module.scss';
import Loading from '../loading';

export default function ArticleList() {
	const dispatch = useDispatch();

	const { articles, articlesCount, error, currentPage, loading } = useSelector(
		(state) => state.article
	);
	useEffect(() => {
		dispatch(fetchArticles(currentPage));
	}, [dispatch, currentPage]);
	const { isLoggedIn } = useSelector((state) => state.user);

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
								author={article.author.username}
								avatar={article.author.image || defaultAvatar}
								date={article.createdAt}
								title={article.title}
								likeCount={article.favoritesCount}
								tags={article.tagList}
								desc={article.description}
								text={article.body}
								isLoggedIn={isLoggedIn}
								slug={article.slug}
							/>
						))}
				</ul>
				<Pagination
					pageSize="10"
					style={{ textAlign: 'center', marginBottom: 30 }}
					current={currentPage}
					total={articlesCount}
					showSizeChanger={false}
					onChange={handlePageChange}
				/>
			</div>
		</section>
	);
}
