import React, { useEffect, useState } from "react";
import SubmitButton from "../../submit-button";
import Tag from "./tag";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  articleCreator,
  articleEditor,
} from "../../../redux/slices/article-control-slice";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import * as path from "../../../utils/router/paths";
import styles from "./article-form.module.scss";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function ArticleForm() {
  const { slug } = useParams();

  const isEditing = !!slug;
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((store) => store.user);
  const { status } = useSelector((store) => store.articleControl);
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
    } else {
      dispatch(articleCreator({ token, data, tags }));
    }
  };

  const { isLight } = useSelector((store) => store.user);

  useEffect(() => {
    if (isEditing && article) {
      setValue("title", article.title);
      setValue("description", article.description);
      setValue("body", article.body);

      if (article.tagList) {
        setTags(article.tagList);
      }
    }
  }, [setValue, article]);

  useEffect(() => {
    if (status === "succeeded") {
      message.success(`Вы ${isEditing ? "обновили" : "опубликовали"} статью!`);
      navigate(`/${path.articlesPath}`);
    }
  }, [status, navigate, isEditing]);

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags((prevTags) => [...prevTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleDeleteTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  return (
    <div className="container-form">
      <form
        className={isLight && "formDark"}
        title="article"
        onSubmit={handleSubmit(handleCreateArticle)}
      >
        <h4 className={styles.title}>
          {isEditing ? "Редактирование статьи" : "Создавать новую статью"}
        </h4>
        <label>
          <span>Заголовок</span>
          <input
            className={styles.articleTitle}
            type="text"
            placeholder="Заголовок"
            {...register("title", {
              required: "Заголовок обязателен!",
              maxLength: {
                message: "Максимальное количество символом 5000!",
                value: 5000,
              },
            })}
          />
        </label>
        {errors?.description && (
          <div className="validation-warning">{errors.description.message}</div>
        )}
        <label>
          <span>Короткое описание</span>
          <input
            className={styles.desc}
            type="text"
            placeholder="Короткое описание"
            {...register("description", {
              required: "Короткое описание обязательное поле!",
              maxLength: {
                message: "Максимальная длина описания 200 символов",
                value: 200,
              },
            })}
          />
        </label>
        {errors?.description && (
          <div className="validation-warning">{errors.description.message}</div>
        )}

        <span style={{ padding: "4px 0", display: "block" }}>Текст</span>
        <SimpleMDE
          type="text"
          onChange={(value) => setValue("body", value)}
          name="body"
          options={{
            // autofocus: true,
            spellChecker: false,
            placeholder: "Текст",
            maxLength: 5000,
          }}
          // {...register("body", {
          //   required: "Текст обязательное поле!",
          //   maxLength: {
          //     message: "Максимальная длина текста в статье 5000 символов",
          //     value: 5000,
          //   },
          // })}
        />

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
            placeholder="Тег"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button
            className={styles.addTag}
            type="button"
            onClick={handleAddTag}
          >
            Добавить
          </button>
        </div>
        <div className={styles.submitContainer}>
          <SubmitButton
            value={!isEditing ? "Поделиться" : "Сохранить"}
            class={styles.sendBtn}
          />
        </div>
      </form>
    </div>
  );
}
