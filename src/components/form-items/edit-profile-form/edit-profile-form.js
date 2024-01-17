import styles from '../general-form.module.scss';
import SubmitButton from '../../submit-button';

export default function EditProfileForm() {
	return (
		<form>
			<h4 className={styles.title}>Edit Profile</h4>
			<label>
				<span>Username</span>
				<input type="text" placeholder="Username" />
			</label>
			<label>
				<span>Email address</span>
				<input type="text" placeholder="Email address" />
			</label>
			<label>
				<span>New password</span>
				<input type="password" placeholder="Password" />
			</label>
			<label>
				<span>Avatar image (url)</span>
				<input type='url' placeholder="Avatar image" />
			</label>

			<SubmitButton value="Save" />
		</form>
	);
}
