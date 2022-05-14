import React, { useState } from 'react';

const Search = ({ history }) => {
	const [ keyword, setKeyword ] = useState('');

	const searchHandler = (e) => {
		e.preventDefault();
		setKeyword(e.target.value);

		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	return (
		<form onSubmit={searchHandler} >
		{/* <form> */}
			<div className="input-group">
				<input
					type="text"
					id="search_field"
					className="form-control"
					placeholder="Enter Product Name ..."
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<div className="input-group-append">
					<button id="search_btn" className="btn">
						<i className="fa fa-search" aria-hidden="true" />
					</button>
				</div>
			</div>
		</form>
	);
};

export default Search;