import { combineReducers } from 'redux'
import product from './product'
import pages from "./pages";
import button from './button';

const rootReducers = combineReducers({
    product,
    pages,
    button
})

export default rootReducers
