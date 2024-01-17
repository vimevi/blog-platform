import styles from './submit-button.module.scss';

export default function SubmitButton({ value }) {
	return <input className={styles.submit} type="submit" value={value} />;
}
