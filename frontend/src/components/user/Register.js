import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../actions/userActions';

const Register = ({ history }) => {
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ conPassword, setConPassword ] = useState('');

	const [ avatar, setAvatar ] = useState('');
	const [ avatarPreview, setAvatarPreview ] = useState('/images/default_avatar.jpg');

	const alert = useAlert();
	const dispatch = useDispatch();

	const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

	useEffect(
		() => {
			if (isAuthenticated) {
				history.push('/');
			}

			if (error) {
				alert.error(error);
				dispatch(clearErrors());
			}
		},
		[ dispatch, alert, isAuthenticated, error, history ]
	);

	const registerHandler = (e) => {
		e.preventDefault();
		const formData = { username, email, password };
		dispatch(register(formData));
	};

	return (
		<Fragment>
			<MetaData title={'Register User'} />

			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form onSubmit={registerHandler} className="register-screen__form">
						<h3 className="register-screen__title">Register</h3>
						{error && <span className="error-message">{error}</span>}
						<div className="form-group">
							<label htmlFor="name">Username:</label>
							<input
								type="text"
								required
								id="name"
								placeholder="Enter username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								class="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								required
								id="email"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								class="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								required
								id="password"
								autoComplete="true"
								placeholder="Enter password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								class="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Confirm Password:</label>
							<input
								type="password"
								required
								id="con_password"
								autoComplete="true"
								placeholder="Confirm password"
								value={conPassword}
								onChange={(e) => setConPassword(e.target.value)}
								class="form-control"
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Register
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};
export default Register;