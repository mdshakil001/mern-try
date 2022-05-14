import React, { Fragment, useState, useRef, useEffect } from 'react';
import '../../App.css';
import Search from './Search';
import { Route, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Dropdown } from 'react-bootstrap';
import { logout } from '../../actions/userActions';

const Header = () => {

	const alert = useAlert();
	const dispatch = useDispatch();
	const modalRef = useRef();

	const [ show, setShow ] = useState(false);

	const { user, loading } = useSelector((s) => s.auth);
	const { cartItems } = useSelector((s) => s.cart);


	const logoutHandler = () => {
		dispatch(logout());
	};
	const location = useLocation();

	return (
		<Fragment>
			<nav className="navbar row navbar">
				<div className="col-12 col-md-3">
					<div className="navbar-brand">
						<Link to="/">
							<img src="/images/shopit_logo.png" />
						</Link>
					</div>
				</div>

				<div className="col-12 col-md-5 mt-2 mt-md-0">
					<Route render={({ history }) => <Search history={history} />} />
				</div>

				<div className="col-12 col-md-4 mt-4 mt-md-0 text-center cart_user">
					<Link to="/cart" style={{ textDecoration: 'none' }}>
						<span id="cart" className="ml-3">
							Cartt
						</span>
						<span className="ml-1" id="cart_count">
							{cartItems.length}
						</span>
					</Link>

					{user && Object.keys(user).length !== 0 ? (
						<Dropdown>
							<Dropdown.Toggle style={{ backgroundColor: '#232f3e', border: 'none' }} id="dropdown-basic">
								<h4>{user.username}</h4>
							</Dropdown.Toggle>

							<Dropdown.Menu style={{ marginTop: '.5rem' }}>
								{user &&
								user.role === 'admin' && (
									<Link to="/dashboard">
										<h5>Dashboard</h5>
									</Link>
								)}
								<Link to="/orders_me">
									<h5>Orders</h5>
								</Link>
								<Link to="/me">
									<h5>Profile</h5>
								</Link>
								<Link to="/" onClick={logoutHandler}>
									<h5>Logout</h5>
								</Link>
							</Dropdown.Menu>
						</Dropdown>
					) : (
						!loading && (
							<Link to="/login" className="btn login-btn" id="login_btn">
								Login
							</Link>
						)
					)}
				</div>
			</nav>
		</Fragment>
	);
};

export default Header;
