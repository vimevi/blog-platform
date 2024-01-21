import { configureStore } from '@reduxjs/toolkit';
import articleSlice from './slices/article-slice';
import userSlice from './slices/user-slice';
import articleControlSlice from './slices/article-control-slice';

const store = configureStore({
	reducer: {
		article: articleSlice,
		user: userSlice,
		articleControl: articleControlSlice,
	},
});

export default store;
