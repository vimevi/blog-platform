import { login, clearRegisterData } from '../../../redux/slices/user-slice';

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { message } from 'antd';
import styles from '../general-form.module.scss';
import { useEffect } from 'react';
import SubmitButton from '../../submit-button';

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	const { token, loginStatus } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const handleLogin = (data) => {
		dispatch(login(data));
	};

	useEffect(() => {
		if (token) {
			message.success('You are logged into your account!');
			navigate('/articles');
		} else {
			if (loginStatus === 'failed') {
				message.error('Invalid authorization data');
			}
		}
	}, [token, navigate, loginStatus, dispatch]);

	useEffect(() => {
		dispatch(clearRegisterData());
	}, [dispatch]);

	return (
		<div className="formContainer">
			<form title="sign-in" onSubmit={handleSubmit(handleLogin)}>
				<h4 className={styles.title}>Sign In</h4>
				<label>
					<span>Email address</span>
					<input
						type="text"
						name="email"
						placeholder="Email address"
						{...register('email', {
							required: 'Email is require field!',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Please enter valid email!',
							},
						})}
					/>
					{errors?.email && (
						<div className="validation-warning">{errors.email.message}</div>
					)}
				</label>
				<label>
					<span>Password</span>
					<input
						type="password"
						name="confirmPassword"
						placeholder="Password"
						{...register('password', {
							required: 'Please enter your password here!',
						})}
					/>
				</label>
				{errors?.password && (
					<div className="validation-warning">{errors.password.message}</div>
				)}
				<SubmitButton value="Send" class={styles.sendBtn} />
				<span className={styles.createProfileText}>
					Don't have an account?
					<NavLink to="/register"> {<span>Sign Up.</span>} </NavLink>
				</span>
			</form>
		</div>
	);
}
