import React, { Fragment, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearErrors } from '../../actions/productActions';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { useParams } from 'react-router-dom';
import { addItemToCart } from '../../actions/cartActions';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ProductDetails = ({ history, match }) => {
	// const location = useLocation();
	// console.log("history === ", history);
	// console.log("match === ", match);
	// console.log("location == ", location);
	const [ quantity, setQuantity ] = useState(1);

	const { user } = useSelector((s) => s.auth);
	// console.log('user => ', user);

	let { id } = useParams();
	const dispatch = useDispatch();
	const alert = useAlert();
	const [ show, setShow ] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { loading, error, product: p } = useSelector((s) => s.productDetails);
	// const { products, loading, error, productCount, resPerPage } = useSelector((s) => s.products);

	// if (Object.keys(p).length == 0) {
	// 	console.log('nothing ..');
	// } else {
	// 	console.log('p = ', p);
	// }

	useEffect(
		() => {
			dispatch(getProductDetails(id));
			// if (error) {
			// 	alert.error(error);
			// 	dispatch(clearErrors());
			// }
		},
		[ dispatch, alert, error, id ]
	);

	const increaseQty = () => {
		setQuantity((x) => {
			if (p.stock <= x) {
				return x;
			} else {
				return x + 1;
			}
		});
	};

	const decreaseQty = () => {
		setQuantity((x) => {
			if (quantity <= 1) {
				return 1;
			} else {
				return x - 1;
			}
		});
	};
	const addToCart = () => {
		// history.push('/login?');
		dispatch(addItemToCart(p._id, quantity));
		// alert.success('Item Added To Cart !');
	};

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<div className="row f-flex justify-content-around">
						<div className="col-12 col-lg-5 img-fluid" id="product_image">
							{Object.keys(p).length == 0 ? (
								<h2>Wait</h2>
							) : (
								<img src={p.images[0].url} alt={p.name} height="300" width="300" />
							)}
						</div>

						<div className="col-12 col-lg-5 mt-5">
							<h3>{p.name}</h3>
							<p id="product_id">Product # sklfjdk35fsdf5090</p>

							<hr />

							<div className="rating-outer">
								<div className="rating-inner" style={{ width: `${p.ratings / 5 * 100}%` }} />
							</div>
							<span id="no_of_reviews">{p.numOfReviews} Reviews</span>

							<hr />

							<p id="product_price">${p.price}</p>
							{/* =========== ADD BUTTON INCERASE AND DECREASE ============ */}
							<div className="stockCounter d-inline">
								<span onClick={decreaseQty} className="btn btn-danger minus">
									-
								</span>

								<input
									type="number"
									className="form-control count d-inline"
									value={p.stock === 0 ? 0 : quantity}
									readOnly
								/>

								<span onClick={increaseQty} className="btn btn-primary plus">
									+
								</span>
							</div>
							{/* =========== END ADD BUTTON INCERASE AND DECREASE ============ */}
							<button
								onClick={addToCart}
								type="button"
								id="cart_btn"
								className="btn btn-primary d-inline ml-4"
								disabled={p.stock === 0}
							>
								Add to Cart
							</button>

							<hr />

							<p>
								Status:{' '}
								<span className={p.stock > 0 ? 'greenColor' : 'redColor'} id="stock_status">
									{p.stock > 0 ? 'In Stock' : 'Out of Stock'}
								</span>
							</p>

							<hr />

							<h4 className="mt-2">Description:</h4>
							<p>{p.description}</p>
							<hr />
							<p id="product_seller mb-3">
								Sold by: <strong>{p.seller}</strong>
							</p>

							{/* Review Start */}
							{user ? (
								<Button onClick={handleShow} className="btn btn-primary mt-4">
									Submit Your Review
								</Button>
							) : (
								<Link to="/login">
									<Button className="btn btn-danger">login to post a review</Button>
								</Link>
							)}

							<Modal show={show} onHide={handleClose}>
								<Modal.Header closeButton>
									<Modal.Title>Submit Review</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<ul className="stars">
										<li className="star">
											<i className="fa fa-star" />
										</li>
										<li className="star">
											<i className="fa fa-star" />
										</li>
										<li className="star">
											<i className="fa fa-star" />
										</li>
										<li className="star">
											<i className="fa fa-star" />
										</li>
										<li className="star">
											<i className="fa fa-star" />
										</li>
									</ul>

									<textarea name="review" id="review" className="form-control mt-3" />

									<button type="button">Submit</button>
								</Modal.Body>
							</Modal>

							{/* End of Review */}
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default ProductDetails;
