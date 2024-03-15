import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import avatar from "../../assets/images/avatar.png";
import { remove } from "../../redux/slices/user-slice";
import { message } from "antd";
import { renderProfileImage } from "../../utils/general-utils/utils";
import SuccessButton from "./success-button";
import * as path from "../../utils/router/paths";
import menu from "../../assets/images/menu.svg";
import close from "../../assets/images/close.png";
import styles from "./header.module.scss";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username, image } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(remove());
    localStorage.removeItem("user");
    message.info("Вы вышли из системы");
    navigate(path.articlesPath);
  };
  const toggleMenu = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };
  useEffect(() => {
    return setIsMenuOpen(false);
  }, []);

  const { token } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <header>
      <NavLink to="/">
        <h6 className={styles.logo}>Блог-платформа</h6>
      </NavLink>

      <nav className={styles.openClose}>
        <div className={styles.closeBtn}></div>

        <button className={styles.openBtn} onClick={toggleMenu}>
          <img src={!isMenuOpen ? menu : close} alt="" />
        </button>
      </nav>
      {token ? (
        <nav
          className={`${styles.loggedInner} ${isMenuOpen ? styles.showMenu : ""}`}
        >
          <NavLink to={path.newArticlePath} tabIndex={-1}>
            <SuccessButton>Написать статью</SuccessButton>
          </NavLink>
          <NavLink className={styles.profile} to={path.profilePath}>
            <span>{username}</span>
            {<img src={avatar} className={styles.avatar}></img> &&
              renderProfileImage(image, `${styles.avatar}`)}
          </NavLink>
          <button onClick={() => handleLogout()} className={styles.logout}>
            Выйти
          </button>{" "}
        </nav>
      ) : (
        <nav
          className={`${styles.inLoggedInner} ${isMenuOpen ? styles.showMenu : ""}`}
        >
          <NavLink tabIndex={-1} to={path.loginPath}>
            <button className={styles.login}>Вход</button>
          </NavLink>
          <NavLink tabIndex={-1} to={path.registerPath}>
            <SuccessButton>Регистрация</SuccessButton>
          </NavLink>
        </nav>
      )}
    </header>
  );
}
