import styles from "./header.module.scss";
import PropTypes from "prop-types";

import React from "react";

export default function SuccessButton({ children }) {
  return <button className={styles.successColor}>{children}</button>;
}

SuccessButton.propTypes = {
  children: PropTypes.string,
};
