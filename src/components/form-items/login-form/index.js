import { login, clearRegisterData } from "../../../redux/slices/user-slice";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { message } from "antd";
import { useEffect } from "react";
import * as path from "../../../utils/router/paths";
import SubmitButton from "../../submit-button";
import styles from "../general-form.module.scss";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLight } = useSelector((store) => store.user);

  const navigate = useNavigate();
  const { token, loginStatus } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogin = (data) => {
    data.email = data.email.toLowerCase();
    dispatch(login(data));
  };

  useEffect(() => {
    if (token) {
      message.success("Вы вошли в свой аккаунт!");
      navigate(`/${path.articlesPath}`);
    } else {
      if (loginStatus === "failed") {
        message.error("Недопустимые данные авторизации");
      }
    }
  }, [token, navigate, loginStatus, dispatch]);

  useEffect(() => {
    dispatch(clearRegisterData());
  }, [dispatch]);

  return (
    <div className="formContainer">
      <form
        className={isLight && "formDark"}
        title="sign-in"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h4 className={styles.title}>Вход</h4>
        <label>
          <span>Email</span>
          <input
            type="text"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: "Email - обязательное поле!",
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
          <span>Пароль</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Пароль"
            {...register("password", {
              required: "Пожалуйста, введите пароль!",
            })}
          />
        </label>
        {errors?.password && (
          <div className="validation-warning">{errors.password.message}</div>
        )}
        <SubmitButton value="Войти" class={styles.sendBtn} />
        <span className={styles.createProfileText}>
          {/* Don&apos;t have an account? */}
          Нет учётной записи?
          <NavLink to={`/${path.registerPath}`}>
            {<span> Создать.</span>}
          </NavLink>
        </span>
      </form>
    </div>
  );
}
