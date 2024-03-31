import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import avatar from "../../assets/images/avatar.png";
import { remove, setTheme } from "../../redux/slices/user-slice";
import { message } from "antd";
import { renderProfileImage } from "../../utils/general-utils/utils";
import SuccessButton from "./success-button";
import * as path from "../../utils/router/paths";
import menu from "../../assets/images/menu.svg";
import close from "../../assets/images/close.png";
import styles from "./header.module.scss";
import theme from "../../assets/images/theme1.svg";
import theme1 from "../../assets/images/theme2.svg";

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

  const { token, isLight } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <header
      className={
        isLight ? `${styles.headerDark} ${styles.header}` : `${styles.header}`
      }
    >
      <NavLink to="/">
        <h6 className={styles.logo}>Блог-платформа</h6>
      </NavLink>

      <nav className={styles.openClose}>
        <div className={styles.closeBtn}></div>

        <button className={styles.openBtn} onClick={toggleMenu}>
          <img src={!isMenuOpen ? menu : close} alt="" />
        </button>
      </nav>
      <button
        onClick={() => dispatch(setTheme())}
        className={isLight ? styles.lightThemeSw : styles.darkThemeSw}
        style={{
          marginLeft: "auto",
          marginRight: 58,
          width: 16,
          height: 16,
          position: "relative",
        }}
      >
        {isLight ? (
          <img src={theme1} alt="" className={styles.theme} />
        ) : (
          <img src={theme} alt="" className={styles.theme} />
        )}
      </button>
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
          <button
            onClick={() => handleLogout()}
            className={`${styles.logout} ${isLight && styles.logoutDark}`}
          >
            Выйти
          </button>
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
