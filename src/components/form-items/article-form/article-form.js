import React, { useState } from 'react';
import styles from './article-form.module.scss';
import SubmitButton from '../../submit-button';
import Tag from './tag';

export default function ArticleForm() {
	const [tags, setTags] = useState([]);
	const [newTag, setNewTag] = useState('');

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

	const isEditing = false;

	return (
		<form>
			<h4 className={styles.title}>
				{isEditing ? 'Edit article' : 'Create new article'}
			</h4>
			<label>
				<span>Title</span>
				<input
					className={styles.articleTitle}
					type="text"
					placeholder="Title"
				/>
			</label>
			<label>
				<span>Short description</span>
				<input
					className={styles.desc}
					type="text"
					placeholder="Short description"
				/>
			</label>
			<label>
				<span>Text</span>
				<textarea className={styles.text} type="text" placeholder="Text" />
			</label>

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
				<button className={styles.addTag} type="button" onClick={handleAddTag}>
					Add tag
				</button>
			</div>
			<div className={styles.submitContainer}>
				<SubmitButton value="Send" class={styles.sendBtn} />
			</div>
		</form>
	);
}
