import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import avatar from "../../assets/images/avatar.png";
import { remove } from "../../redux/slices/user-slice";
import { message } from "antd";
import { renderProfileImage } from "../../utils/general-utils/utils";
import SuccessButton from "./success-button";
import style from "./header.module.scss";

export default function Header() {
  const { username, image } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(remove());
    localStorage.removeItem("user");
    message.info("You are logged out");
    navigate("articles");
  };

  const { token } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <header>
      <NavLink to="/">
        <h6 className={style.logo}>Realworld Blog</h6>
      </NavLink>

      {token ? (
        <nav className={style.loggedInner}>
          <NavLink to="new-article" tabIndex={-1}>
            <SuccessButton>Create article</SuccessButton>
          </NavLink>
          <NavLink className={style.profile} to="profile">
            <span>{username}</span>
            {renderProfileImage(image, style, avatar)}
          </NavLink>
          <button onClick={() => handleLogout()} className={style.logout}>
            Log Out
          </button>{" "}
        </nav>
      ) : (
        <nav className={style.unloggedInner}>
          <NavLink tabIndex={-1} to="/login">
            <button className={style.login}>Sign In</button>
          </NavLink>
          <NavLink tabIndex={-1} to="/register">
            <SuccessButton>Sign Up</SuccessButton>
          </NavLink>
        </nav>
      )}
    </header>
  );
}
