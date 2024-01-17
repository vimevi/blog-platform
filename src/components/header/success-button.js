import styles from './header.module.scss';

import React from 'react';

export default function SuccessButton({ children }) {
	return <button className={styles.successColor}>{children}</button>;
}
