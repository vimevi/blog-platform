import React from 'react';
import styles from '../general-form.module.scss';
import SubmitButton from '../../submit-button';
import { NavLink } from 'react-router-dom';

export default function LoginForm() {
	return (
		<div className="formContainer">
			<form>
				<h4 className={styles.title}>Sign In</h4>
				<label>
					<span>Email address</span>
					<input type="text" placeholder="Email address" />
				</label>
				<label>
					<span>Password</span>
					<input type="password" placeholder="Password" />
				</label>
				<SubmitButton value="Create" />
				<span className={styles.createProfileText}>
					Don’t have an account?{' '}
					<NavLink to="/register"> {<span>Sign Up.</span>} </NavLink>
				</span>
			</form>
		</div>
	);
}
