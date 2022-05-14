import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin, component: Component, ...xxx }) => {
	const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
	// console.log("protected route: ", xxx);

	return (
		<Fragment>
			{loading === false && (
				<Route
					{...xxx}
					render={(props) => {
						if (isAuthenticated === false) {
							return <Redirect to="/login" />;
						}

						if (isAdmin === true && user.role !== 'admin') {
							return <Redirect to="/" />;
						}

						return <Component {...props} />;
					}}
				/>
			)}
		</Fragment>
	);
};

export default ProtectedRoute;