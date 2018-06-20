import { combineReducers } from 'redux';
import revenues from './revenues';
import dashBoard from './dashBoard';


const reducers = combineReducers({ revenues, dashBoard });

export default reducers;
