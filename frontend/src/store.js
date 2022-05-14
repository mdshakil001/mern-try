import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer, productReducer, productDetailsReducer, newProductReducer } from './reducers/productReducers';
import { authReducer, userReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import {
	newOrderReducer,
	allOrdersReducer,
	orderReducer,
	orderDetailsReducer,
	myOrdersReducer
} from './reducers/orderReducer';

const reducer = combineReducers({
	products: productsReducer,
	product: productReducer,
	productDetails: productDetailsReducer,
	newProduct: newProductReducer,

	auth: authReducer,
	user: userReducer,
	cart: cartReducer,

	newOrder: newOrderReducer,
	myOrders: myOrdersReducer,
	allOrders: allOrdersReducer,
	orderDetails: orderDetailsReducer,
	order: orderReducer,

	allUsers: allUsersReducer,
	userDetails: userDetailsReducer
});

let initialState = {
	cart: {
		cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
		shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
	}
};

const middlware = [ thunk ];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)));

export default store;