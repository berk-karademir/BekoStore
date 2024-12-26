import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './reducers/userReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';
import productReducer from './reducers/productReducer';
import checkoutReducer from './reducers/checkoutReducer';
import { logger } from 'redux-logger';
const rootReducer = combineReducers({
  client: userReducer,
  shoppingCart: shoppingCartReducer,
  product: productReducer,
  checkout: checkoutReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
