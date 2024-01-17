class userService {
	BASE_URL = 'https://blog.kata.academy/api/';

	async registerAccount(credentials) {
		const response = await fetch(this.BASE_URL + '/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user: credentials }),
		});
		if (!response.ok) {
			throw new Error('Server Error occured!');
		}
		const data = await response.json();
		console.log(data);
		return data;
	}
	login() {}
	editProfile() {}
	logout() {}
}

const instanceUserServiceService = new userService();

export default instanceUserServiceService;
