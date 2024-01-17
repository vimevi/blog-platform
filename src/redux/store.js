import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './slices/article-slice';
import userReducer from './slices/user-slice';

const store = configureStore({
	reducer: { article: articleReducer, user: userReducer },
});

export default store;
