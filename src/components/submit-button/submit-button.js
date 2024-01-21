import styles from './submit-button.module.scss';

export default function SubmitButton({ value, password, email, onRegister, username }) {
	return (
		<input
			onSubmit={() => onRegister(email, password, username)}
			className={styles.submit}
			type="submit"
			value={value}
		/>
	);
}
