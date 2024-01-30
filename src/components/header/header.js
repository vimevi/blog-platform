import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import avatar from "../../assets/images/avatar.png";
import { remove } from "../../redux/slices/user-slice";
import { message } from "antd";
import { renderProfileImage } from "../../utils/general-utils/utils";
import SuccessButton from "./success-button";
import * as path from "../../utils/router/paths";
import style from "./header.module.scss";

export default function Header() {
  const { username, image } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(remove());
    localStorage.removeItem("user");
    message.info("Вы вышли из системы");
    navigate(path.articlesPath);
  };

  const { token } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <header>
      <NavLink to="/">
        <h6 className={style.logo}>Блог-платформа</h6>
      </NavLink>

      {token ? (
        <nav className={style.loggedInner}>
          <NavLink to={path.newArticlePath} tabIndex={-1}>
            <SuccessButton>Написать статью</SuccessButton>
          </NavLink>
          <NavLink className={style.profile} to={path.profilePath}>
            <span>{username}</span>
            {<img src={avatar} className={style.avatar}></img> &&
              renderProfileImage(image, `${style.avatar}`)}
          </NavLink>
          <button onClick={() => handleLogout()} className={style.logout}>
            Выйти
          </button>{" "}
        </nav>
      ) : (
        <nav className={style.unloggedInner}>
          <NavLink tabIndex={-1} to={path.loginPath}>
            <button className={style.login}>Вход</button>
          </NavLink>
          <NavLink tabIndex={-1} to={path.registerPath}>
            <SuccessButton>Регистрация</SuccessButton>
          </NavLink>
        </nav>
      )}
    </header>
  );
}
