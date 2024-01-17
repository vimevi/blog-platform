import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import instanceUserServiceService from '../../api/user-service';

const initialState = {
	isLoggedIn: false,
	loading: true,
	error: null,
	email: null,
	token: null,
	username: null,
	image: null,
};

export const createUser = createAsyncThunk(
	'article/fetchArticles',
	async function (data, { rejectWithValue }) {
		try {
			return await instanceUserServiceService.registerAccount(data);
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.email = action.payload.email;
			state.token = action.payload.token;
			state.username = action.payload.username;
			state.image = action.payload.image;
			state.isLoggedIn = true;
		},
		remove(state) {
			state.email = null;
			state.token = null;
			state.username = null;
			state.image = null;
			state.isLoggedIn = false;
		},
		login(state, action) {},
		register(state, action) {},
		logout(state, action) {},
		edit(state, action) {},
	},
	extraReducers: (builder) => {
		// 	builder
		// 		.addCase(fetchArticles.pending, (state, action) => {
		// 			state.status = 'loading';
		// 			state.error = null;
		// 		})
		// 		.addCase(fetchArticles.fulfilled, (state, action) => {
		// 			state.status = 'succeeded';
		// 			state.loading = false;
		// 			state.articles = action.payload.articles;
		// 			state.articlesCount = action.payload.articlesCount;
		// 		})
		// 		.addCase(fetchArticles.rejected, (state, action) => {
		// 			state.status = 'rejected';
		// 			state.loading = false;
		// 			state.error = action.payload;
		// 		});
	},
});

export default userSlice.reducer;

export const { renderList, remove, create, setUser } = userSlice.actions;
