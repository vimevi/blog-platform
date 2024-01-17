import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instanceArticleService from '../../api/article-service';

const initialState = {
	currentPage: 1,
	loading: true,
	status: null, // надобность данного поля под вопросом
	articles: [],
	article: {},
	error: null,
	articlesCount: 0,
	isOpenFull: false,
	slug: '',
};

export const fetchArticles = createAsyncThunk(
	'article/fetchArticles',
	async function (page, { rejectWithValue }) {
		try {
			return await instanceArticleService.getArticles(page);
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const fetchFullArticle = createAsyncThunk(
	'article/fetchFullArticle',
	async function (id, { rejectWithValue }) {
		try {
			return await instanceArticleService.getArticlePage(id);
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {
		changePage(state, action) {
			state.currentPage = action.payload;
		},
		// create(state, action) {},
		// remove(state, action) {},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticles.pending, (state) => {
				state.status = 'loading';
				state.error = null;
				state.articles = [];
				state.loading = true;
			})
			.addCase(fetchArticles.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.loading = false;
				state.articles = action.payload.articles;
				state.articlesCount = action.payload.articlesCount;
			})
			.addCase(fetchArticles.rejected, (state, action) => {
				state.status = 'rejected';
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchFullArticle.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.loading = false;
				state.article = action.payload;
			})
			.addCase(fetchFullArticle.pending, (state, action) => {
				state.status = null;
				state.loading = true;
				// state.article = {};
				// localStorage.setItem('article', JSON.stringify(action.payload));
			})
			.addCase(fetchFullArticle.rejected, (state, action) => {
				state.status = 'rejected';
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default articleSlice.reducer;

export const { renderList, create, remove, changePage } = articleSlice.actions;
