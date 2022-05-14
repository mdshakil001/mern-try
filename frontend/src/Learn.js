import React, { useState } from 'react';

const Learn = () => {
	const data = [ 'apple', 'banana', 'orange', 'grapes' ];
	const [ val, setVal ] = useState(data[1]);
	const selecthandler = (e) => {
		console.log(e.target.value);
		setVal(e.target.value);
	};
	return (
		<div>
			<label htmlFor="cars">Choose a car:</label>

			<select name="cars" value={val} onChange={selecthandler}>
				{data.map((d, indx) => {
					return (
						<option key={indx} value={d}>
							{d}
						</option>
					);
				})}
			</select>
			<h3>value : {val}</h3>
		</div>
	);
};

export default Learn;
