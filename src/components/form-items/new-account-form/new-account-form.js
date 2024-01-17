import SubmitButton from '../../submit-button';
import styles from '../general-form.module.scss';
import { createUser } from '../../../redux/slices/user-slice';
import { useDispatch } from 'react-redux';

export default function NewAccountForm() {
	const displatch = useDispatch()
	return (
		<div className="formContainer">
			<form>
				<h4 className={styles.title}>Create new account</h4>
				<label>
					<span>Username</span>
					<input type="text" placeholder="Username" />
				</label>
				<label>
					<span>Email address</span>
					<input type="text" placeholder="Email address" />
				</label>
				<label>
					<span>Password</span>
					<input type="password" placeholder="Password" />
				</label>
				<label>
					<span>Repeat Password</span>
					<input type="password" placeholder="Repeat Password" />
				</label>
				<label className={styles.checkboxLine}>
					<input type="checkbox" />I agree to the processing of my personal
					information
				</label>
				<SubmitButton value="Create" />
			</form>
		</div>
	);
}
