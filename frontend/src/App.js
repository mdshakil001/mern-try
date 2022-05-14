import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { loadUser } from './actions/userActions';
import store from './store';
import { useSelector } from 'react-redux';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

// Admin
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';

// Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
	const [ stripeApiKey, setStripeApiKey ] = useState('');

	const { user, isAuthenticated, loading } = useSelector((s) => s.auth);

	useEffect(() => {
		store.dispatch(loadUser());

		async function getStripApiKey() {
			const { data } = await axios.get('/api/v1/stripeapi');
			setStripeApiKey(data.stripeApiKey);
		}
		getStripApiKey();
	}, []);

	return (
		<Router>
			<div>
				<Header />
				<div className="container container-fluid">
					<Route path="/" exact component={Home} />
					<Route path="/cart" exact component={Cart} />
					<Route path="/search/:keyword" component={Home} />
					<Route path="/product/:id" exact component={ProductDetails} />

					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />

					<ProtectedRoute path="/me" component={Profile} exact />
					<ProtectedRoute path="/update-profile" component={UpdateProfile} exact />
					<ProtectedRoute path="/password/update" component={UpdatePassword} exact />
					<ProtectedRoute path="/shipping" component={Shipping} />
					<ProtectedRoute path="/order_confirm" component={ConfirmOrder} />
					<ProtectedRoute path="/success" component={OrderSuccess} />
					<ProtectedRoute path="/orders_me" component={ListOrders} />
					<ProtectedRoute path="/order/:id" component={OrderDetails} exact />

					{stripeApiKey && (
						<Elements stripe={loadStripe(stripeApiKey)}>
							<ProtectedRoute path="/payment" component={Payment} />
						</Elements>
					)}
				</div>
				{/* Admin */}
				<ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
				<ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
				<ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
				<ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
				<ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
				<ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
				<ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
				<ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />

				{!loading && (!isAuthenticated || user.role !== 'admin') && <Footer />}
			</div>
		</Router>
	);
}

export default App;
