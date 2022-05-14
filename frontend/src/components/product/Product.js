import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ p, col }) => {
	return (
		<div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
			<div className="card p-3 rounded">
				<img className="card-img-top mx-auto" src={p.images[0].url} alt={p.name} />
				<div className="card-body d-flex flex-column">
					<h5 className="card-title">
						<Link to={`/product/${p._id}`}>{p.name}</Link>
					</h5>
					<div className="ratings mt-auto">
						<div className="rating-outer">
							<div className="rating-inner" style={{ width: `${p.ratings / 5 * 100}%` }} />
						</div>
						<span id="no_of_reviews">{p.numOfReviews} Reviews</span>
					</div>
					<p className="card-text">${p.price}</p>
					<Link to={`/product/${p._id}`} id="view_btn" className="btn btn-block">
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Product;
