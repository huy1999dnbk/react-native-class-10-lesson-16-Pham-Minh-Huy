import {combineReducers} from 'redux';

import answerReducer from "./answerReducer";
import userReducer from './UserReducer';
import productReducer from './productReducer';
export default combineReducers({answerReducer,userReducer,productReducer});
