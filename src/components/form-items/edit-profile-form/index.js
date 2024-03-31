import SubmitButton from "../../submit-button";
import {
  editProfile,
  clearRegisterData,
} from "../../../redux/slices/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import * as path from "../../../utils/router/paths";
import styles from "../general-form.module.scss";

export default function EditProfileForm() {
  const dispatch = useDispatch();
  const { username, email, image, token, editProfileStatus } = useSelector(
    (store) => store.user,
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEditProfile = async (data) => {
    if (data.email) {
      data.email = data?.email.toLowerCase();
    }
    if (data.image) {
      data.image = data?.image.toLowerCase();
    }
    dispatch(editProfile({ data, token }));
  };

  useEffect(() => {
    if (editProfileStatus === "succeeded") {
      message.success("Профиль обновлён!");
      navigate(`/${path.articlesPath}`);
    }
  }, [editProfileStatus, navigate]);
  const { isLight } = useSelector((store) => store.user);
  useEffect(() => {
    dispatch(clearRegisterData());
    setValue("username", username);
    setValue("email", email);
    setValue("image", image);
  }, [username, email, image, setValue, dispatch]);

  return (
    <div className="formContainer">
      <form
        className={isLight && "formDark"}
        onSubmit={handleSubmit(handleEditProfile)}
      >
        <h4 className={styles.title}>Редактировать профиль</h4>
        <label>
          <span>Имя пользователя</span>
          <input
            type="text"
            name="username"
            placeholder="Имя пользователя"
            {...register("username", {
              required: "Имя пользователя - обязательное поле!",
              minLength: {
                message: "Минимальное длина имени пользователя - 3 символа",
                value: 3,
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message:
                  "Имя пользователя должно содержать только латинские буквы и не содержать пробелов!",
              },
              maxLength: {
                message: "Максимальная длина имени пользователя - 20",
                value: 20,
              },
            })}
          />
        </label>
        <label>
          <span>Email адрес</span>
          <input
            type="text"
            name="email"
            placeholder="Email адрес"
            {...register("email", {
              required: "Email является обязательным полем!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Пожалуйста, введите действительный email!",
              },
            })}
          />
          {errors?.email && (
            <div className="validation-warning">{errors.email.message}</div>
          )}
        </label>
        <label>
          <span>Новый пароль</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Пароль"
            {...register("password", {
              required:
                "Пожалуйста, подтвердите свой пароль или введите новый!",
              minLength: {
                value: 6,
                message: "Минимальная длина пароля - 6 символов",
              },
              maxLength: {
                value: 40,
                message: "Максимальная длина пароля - 40 символов",
              },
            })}
          />
          {errors?.password && (
            <div className="validation-warning">{errors.password.message}</div>
          )}
        </label>
        <label>
          <span>Главное фото (url)</span>
          <input
            type="url"
            placeholder="Avatar image"
            {...register("image", {
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: "Введите действительный URL-адрес!",
              },
            })}
          />
        </label>
        {errors?.image && (
          <div className="validation-warning">{errors.image.message}</div>
        )}

        <SubmitButton value="Сохранить" />
      </form>
    </div>
  );
}
