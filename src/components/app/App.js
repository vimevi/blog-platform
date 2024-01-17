import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '../header/header';
import ArticleList from '../article-list/article-list';
import NewAccountForm from '../form-items/new-account-form';
import './app.module.scss';
import EditProfileForm from '../form-items/edit-profile-form';
import LoginForm from '../form-items/login-form';
import ArticleForm from '../form-items/article-form';

import ArticlePage from '../article-page/article-page';

function App() {
	return (
		<div>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route index path="/" element={<ArticleList />} />
					<Route path="register" element={<NewAccountForm />} />
					<Route path="login" element={<LoginForm />} />
					<Route path="articles/:slug" element={<ArticlePage />} />
					<Route path="profile" element={<EditProfileForm />}></Route>
					<Route />
					<Route path='*' element={<h3 className='spin'>Nothing was found: 404!</h3>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
