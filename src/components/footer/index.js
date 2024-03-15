import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className={styles.footer}>
          Разработал Торопчин Максим Николаевич
        </div>
      </div>
    </footer>
  );
};

export default Footer;
