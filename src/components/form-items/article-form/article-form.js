import React, { useEffect, useState } from 'react';
import styles from './article-form.module.scss';
import SubmitButton from '../../submit-button';
import Tag from './tag';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
	articleCreator,
	articleEditor,
} from '../../../redux/slices/article-control-slice';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';

export default function ArticleForm() {
	const { slug } = useParams();

	const isEditing = !!slug;
	const [tags, setTags] = useState([]);
	const [newTag, setNewTag] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { token } = useSelector((store) => store.user);
	const { status, curArticle } = useSelector((store) => store.articleControl);
	const { article } = useSelector((store) => store.article);

	const {
		handleSubmit,
		setValue,
		register,
		formState: { errors },
	} = useForm();

	const handleCreateArticle = (data) => {
		if (isEditing) {
			dispatch(articleEditor({ token, data, tags, slug }));
		} else dispatch(articleCreator({ token, data, tags }));
	};
	useEffect(() => {
		if (isEditing && article) {
			setValue('title', article.title);
			setValue('description', article.description);
			setValue('body', article.body);
		}
	}, [isEditing, setValue, article]);

	useEffect(() => {
		if (status === 'succeeded') {
			message.success(
				`You have ${isEditing ? 'updated' : 'posted'} an article!`
			);
			navigate('/articles');
		}
	}, [status, navigate, isEditing]);

	const handleAddTag = () => {
		if (newTag.trim() !== '') {
			setTags([...tags, newTag.trim()]);
			setNewTag('');
		}
	};

	const handleDeleteTag = (index) => {
		const updatedTags = [...tags];
		updatedTags.splice(index, 1);
		setTags(updatedTags);
	};

	return (
		<div className="container">
			<form title="article" onSubmit={handleSubmit(handleCreateArticle)}>
				<h4 className={styles.title}>
					{isEditing ? 'Edit article' : 'Create new article'}
				</h4>
				<label>
					<span>Title</span>
					<input
						className={styles.articleTitle}
						type="text"
						placeholder="Title"
						{...register('title', {
							required: 'Title is require field!',

							maxLength: {
								message: 'Maximum length of username is 5000',
								value: 5000,
							},
						})}
					/>
				</label>
				{errors?.description && (
					<div className="validation-warning">{errors.description.message}</div>
				)}
				<label>
					<span>Short description</span>
					<input
						className={styles.desc}
						type="text"
						placeholder="Short description"
						{...register('description', {
							required: 'Short description is require field!',
							maxLength: {
								message: 'Maximum length of description is 200',
								value: 200,
							},
						})}
					/>
				</label>
				{errors?.description && (
					<div className="validation-warning">{errors.description.message}</div>
				)}
				<label>
					<span>Text</span>
					<textarea
						className={styles.text}
						type="text"
						placeholder="Text"
						{...register('body', {
							required: 'Body is require field!',
							maxLength: {
								message: 'Maximum length of body is 5000',
								value: 5000,
							},
						})}
					/>
				</label>
				{errors?.body && (
					<div className="validation-warning">{errors.body.message}</div>
				)}
				<span className={styles.tagTitle}>Tags</span>
				{tags.map((tag, index) => (
					<Tag key={index} tag={tag} onDelete={() => handleDeleteTag(index)} />
				))}
				<div className={styles.tagInputContainer}>
					<input
						className={styles.tagInput}
						type="text"
						placeholder="Tag"
						value={newTag}
						onChange={(e) => setNewTag(e.target.value)}
					/>
					<button
						className={styles.addTag}
						type="button"
						onClick={handleAddTag}
					>
						Add tag
					</button>
				</div>
				<div className={styles.submitContainer}>
					<SubmitButton
						value={!isEditing ? 'Send' : 'Save'}
						class={styles.sendBtn}
					/>
				</div>
			</form>
		</div>
	);
}
