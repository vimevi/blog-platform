import { NavLink } from 'react-router-dom';
import SuccessButton from './success-button';

import avatar from '../../assets/images/avatar.png';

import style from './header.module.scss';

export default function Header() {
	const isLoggedin = false;
	return (
		<header>
			<NavLink to="/">
				{' '}
				<h6 className={style.logo}>Realworld Blog</h6>
			</NavLink>

			{isLoggedin ? (
				<nav className={style.loggedInner}>
					<SuccessButton>Create article</SuccessButton>
					<button className={style.profile}>
						<span>Profile name</span>
						<img src={avatar} alt={style.avatar} />{' '}
					</button>
					<button className={style.logout}>Log Out</button>{' '}
				</nav>
			) : (
				<nav className={style.unloggedInner}>
					<NavLink to="/login">
						<button className={style.login}>Sign In</button>
					</NavLink>
					<NavLink to="/register">
						<SuccessButton>Sign Up</SuccessButton>
					</NavLink>
				</nav>
			)}
		</header>
	);
}
// {
//
// }
