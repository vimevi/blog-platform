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
      message.success(`Your profile was successfully created! Welcome`);
      navigate("/login");
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
      navigate("/articles");
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
          <span>Username</span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            {...register("username", {
              required: "Username is require field!",
              minLength: {
                message: "Minimum length of username is 3",
                value: 3,
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message:
                  "Username should only contain Latin letters and numbers with no spacing!",
              },
              maxLength: {
                message: "Maximum length of username is 20",
                value: 20,
              },
            })}
          />
          {errors?.username && (
            <div className="validation-warning">{errors.username.message}</div>
          )}
        </label>
        <label>
          <span>Email address</span>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            {...register("email", {
              required: "Email is require field!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter valid email!",
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
                message: "Mininum length of password is 6 symbols",
              },
              maxLength: {
                value: 40,
                message: "Maximum length of this field is 40 characters",
              },
            })}
          />
          {errors?.password && (
            <div className="validation-warning">{errors.password.message}</div>
          )}
        </label>
        <label>
          <span>Repeat Password</span>
          <input
            type="password"
            placeholder="Repeat Password"
            {...register("repeatPassword", {
              required: "Please confirm your password!",
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
              required:
                "Agreement for the processing of personal data is required",
            })}
          />
          I agree to the processing of my personal information
        </label>
        {errors?.agree && (
          <div className="validation-warning">{errors.agree.message}</div>
        )}
        <SubmitButton value="Create" class={styles.sendBtn} />
      </form>
    </div>
  );
}
