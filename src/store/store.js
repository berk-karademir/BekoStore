import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './reducers/userReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';
import productReducer from './reducers/productReducer';

const rootReducer = combineReducers({
  client: userReducer,
  shoppingCart: shoppingCartReducer,
  product: productReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
