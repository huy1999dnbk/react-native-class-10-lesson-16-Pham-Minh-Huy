import {combineReducers} from 'redux';

import answerReducer from "./answerReducer";
import userReducer from './UserReducer';

export default combineReducers({answerReducer,userReducer});
