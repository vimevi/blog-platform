import styles from "../general-form.module.scss";
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
      message.success("Your profile was updated!");
      navigate("/articles");
    }
  }, [editProfileStatus, navigate]);

  useEffect(() => {
    dispatch(clearRegisterData());
    setValue("username", username);
    setValue("email", email);
    setValue("image", image);
  }, [username, email, image, setValue, dispatch]);

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(handleEditProfile)}>
        <h4 className={styles.title}>Edit Profile</h4>
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
          <span>New password</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Password"
            {...register("password", {
              required: "Please confirm your password or enter new here!",
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
          <span>Avatar image (url)</span>
          <input
            type="url"
            placeholder="Avatar image"
            {...register("image", {
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: "Enter a valid URL!",
              },
            })}
          />
        </label>
        {errors?.image && (
          <div className="validation-warning">{errors.image.message}</div>
        )}

        <SubmitButton value="Save" />
      </form>
    </div>
  );
}
