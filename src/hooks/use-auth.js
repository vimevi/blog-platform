import { useSelector } from 'react-redux';

export function useAuth() {
	const { email, token, username, image } = useSelector((state) => state.user);

	return {
		isAuth: !!email,
		email,
		token,
		username,
		image,
	};
}
