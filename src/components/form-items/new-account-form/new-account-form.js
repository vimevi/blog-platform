import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  createUser,
  clearRegisterData,
} from "../../../redux/slices/user-slice";
import { handleRegister as handleRegisterUtil } from "../../../utils/handle-submits/handle-submits";
import { useForm } from "react-hook-form";
import { message } from "antd";
import SubmitButton from "../../submit-button";
import * as path from "../../../utils/router/paths";
import styles from "../general-form.module.scss";

export default function NewAccountForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { error, registerStatus, token } = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toLogin = useCallback(() => {
    if (registerStatus === "succeeded") {
      message.success(`Ваш профиль успешно создан! Добро пожаловать!`);
      navigate(`/${path.loginPath}`);
    }
  }, [registerStatus, navigate]);

  const handleRegister = (data) => {
    handleRegisterUtil(
      data,
      dispatch,
      createUser,
      setIsSubmitting,
      isSubmitting,
      error,
    );
  };

  useEffect(() => {
    if (token) {
      navigate(`/${path.articlesPath}`);
    }
    if (error) {
      message.error(error);
    }
    dispatch(clearRegisterData());
    toLogin();
  }, [toLogin, token, dispatch, error]);

  return (
    <div className="formContainer">
      <form title="register" onSubmit={handleSubmit(handleRegister)}>
        <h4 className={styles.title}>Create new account</h4>
        <label>
          <span>Имя пользователя</span>
          <input
            type="text"
            name="username"
            placeholder="Имя пользователя"
            {...register("username", {
              required: "Имя пользователя - обязательное поле!",
              minLength: {
                message: "Минимальная длина имени пользователя - 3",
                value: 3,
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message:
                  "Имя пользователя должно содержать только латинские буквы и цифры без пробелов!",
              },
              maxLength: {
                message: "Максимальная длина имени пользователя - 20",
                value: 20,
              },
            })}
          />
          {errors?.username && (
            <div className="validation-warning">{errors.username.message}</div>
          )}
        </label>
        <label>
          <span>Email</span>
          <input
            type="text"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: "Адрес электронной почты - обязательное поле!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message:
                  "Пожалуйста, введите действительный адрес электронной почты!",
              },
            })}
          />
          {errors?.email && (
            <div className="validation-warning">{errors.email.message}</div>
          )}
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Password"
            {...register("password", {
              required: "Please enter password here!",
              minLength: {
                value: 6,
                message: "Минимальная длина пароля - 6 символов",
              },
              maxLength: {
                value: 40,
                message: "Максимальная длина пароль составляет 40 символов",
              },
            })}
          />
          {errors?.password && (
            <div className="validation-warning">{errors.password.message}</div>
          )}
        </label>
        <label>
          <span>Повторите пароль</span>
          <input
            type="password"
            placeholder="Повторите пароль"
            {...register("repeatPassword", {
              required: "Пожалуйста, подтвердите свой пароль!",
            })}
          />
          {errors?.repeatPassword && (
            <div className="validation-warning">
              {errors.repeatPassword.message}
            </div>
          )}
        </label>
        <label className={styles.checkboxLine}>
          <input
            type="checkbox"
            {...register("agree", {
              required: "Требуется согласие на обработку персональных данных",
            })}
          />
          Я согласен на обработку моей личной информации
        </label>
        {errors?.agree && (
          <div className="validation-warning">{errors.agree.message}</div>
        )}
        <SubmitButton value="Create" class={styles.sendBtn} />
      </form>
    </div>
  );
}
