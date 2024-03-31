import { useSelector } from "react-redux";
import styles from "./footer.module.scss";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { token, isLight } = useSelector((store) => store.user);
  return (
    <footer className={isLight ? styles.footerDark : ""}>
      <div className="container">
        <div className={styles.footer}>
          <div className={styles.footerRight}>
            <span>О компании</span>
            <a href="#">Готовые продукты</a>
            <a href="#">Полученные результаты</a>
          </div>
          {!token ? (
            <div className={styles.footerLeft}>
              <span>Действия</span>
              <NavLink to="/login">Вход</NavLink>
              <NavLink to="/register">Регистрация</NavLink>
            </div>
          ) : (
            <div className={styles.footerLeft}>
              <span>Действия</span>
              <NavLink to="profile">Редактировать профиль</NavLink>
              <NavLink to="new-article">Написать статью</NavLink>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
