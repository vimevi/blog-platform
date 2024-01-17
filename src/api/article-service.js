class articleService {
	BASE_URL = 'https://blog.kata.academy/api/';

	async getArticles(page) {
		const limit = 10;
		const url = new URL(this.BASE_URL + 'articles');
		url.searchParams.set('limit', limit);
		url.searchParams.set('offset', page * limit - limit);
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Server Error occured!');
		}
		const data = await response.json();
		console.log(data);
		return data;
	}

	async getArticlePage(id) {
		const url = new URL(this.BASE_URL + `articles/${id}`);
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Server Error occured!');
		}
		const data = await response.json();
		return data;
	}
}

const instanceArticleService = new articleService();

export default instanceArticleService;
