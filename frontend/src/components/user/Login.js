import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../actions/userActions';

const Login = ({ history, location }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ empty, setEmpty ] = useState(false);

	const alert = useAlert();
	const dispatch = useDispatch();

	const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(
		() => {
			if (isAuthenticated) {
				history.push(redirect);
				console.log('authenticated !');
			}

			// if (error) {
			// 	alert.error(error);
			// 	dispatch(clearErrors());
			// }
		},
		[ dispatch, alert, isAuthenticated, error, history ]
	);

	const emptyAlert = <h5 style={{ color: 'red' }}>Please Enter Email and password !</h5>;

	const submitHandler = (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			setEmpty(true);
		} else {
			setEmpty(false);
			dispatch(login(email, password));
		}
	};

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={'Login'} />

					<div className="row wrapper">
						<div className="col-10 col-lg-5">
							<form className="shadow-lg" onSubmit={submitHandler}>
								{empty && emptyAlert}
								<div className="form-group">
									<label htmlFor="email_field">Email</label>
									<input
										type="email"
										id="email_field"
										className="form-control"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="password_field">Password</label>
									<input
										type="password"
										id="password_field"
										className="form-control"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<button
									id="login_button"
									type="submit"
									className="col-12 btn btn-block float-right mb-4"
								>
									LOGIN
								</button>

								<div className="row">
									<Link to="/password/forgot" className="col">
										<button className="btn btn-block  mb-4">Forgot Password?</button>
									</Link>

									<Link to="/register" className="col">
										<button className="btn btn-block  mb-4">New User?</button>
									</Link>
								</div>
							</form>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Login;
