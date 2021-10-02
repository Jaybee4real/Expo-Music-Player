import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import app from './app';
import auth from './auth';

const reducer = combineReducers({
	auth,
	app,
});

const store = configureStore({
	reducer,
});

export default store;
