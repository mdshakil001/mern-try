import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layout/Loader';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ price, setPrice ] = useState([ 1, 1000 ]);
	const [ category, setCategory ] = useState('');
	const dispatch = useDispatch();
	const alert = useAlert();
	const { products, loading, error, productCount, resPerPage } = useSelector((s) => s.products);
	const keyword = match.params.keyword;

	const categories = [
		'Electronics',
		'Cameras',
		'Laptops',
		'Accessories',
		'Headphones',
		'Food',
		'Books',
		'Clothes/Shoes',
		'Beauty/Health',
		'Sports',
		'Outdoor',
		'Home'
	];

	useEffect(
		() => {
			if (error) {
				return alert.error(error);
			}
			dispatch(getProducts(keyword, currentPage, price, category));
		},
		[ dispatch, alert, error, currentPage, keyword, price, category ]
	);

	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber);
	}

	return loading ? (
		<Loader />
	) : (
		<Fragment>
			<MetaData title={'Buy Best Products'} />
			<section id="products" className="container mt-5">
				<div className="row">
					{keyword ? (
						<Fragment>
							<div className="col-6 col-md-3 mt-5 mb-5">
								<div className="px-5">
									<Range
										marks={{
											1: `$1`,
											1000: `$1000`
										}}
										min={1}
										max={1000}
										defaultValue={[ 1, 1000 ]}
										tipFormatter={(value) => `$${value}`}
										tipProps={{
											placement: 'top',
											visible: true
										}}
										value={price}
										onChange={(price) => setPrice(price)}
									/>
									<hr className="my-5" />
									<div className="mt-5">
										<h4 className="mb-3">Categories</h4>
										<ul className="pl-0">
											{categories.map((category) => (
												<li
													style={{ cursor: 'pointer', listStyleType: 'none' }}
													key={category}
													onClick={() => setCategory(category)}
												>
													{category}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<div className="col-6 col-md-9">
								<div className="row">
									{products.map((p) => {
										return <Product key={p._id} p={p} col={4} />;
									})}
								</div>
							</div>
						</Fragment>
					) : (
						products.map((p) => {
							return <Product key={p._id} p={p} col={3} />;
						})
					)}
				</div>
			</section>

			<div className="d-flex justify-content-center mt-5">
				<Pagination
					activePage={currentPage}
					itemsCountPerPage={resPerPage}
					totalItemsCount={productCount}
					onChange={setCurrentPageNo}
					nextPageText={'Next'}
					prevPageText={'Previous'}
					firstPageText={'First'}
					lastPageText={'Last'}
					itemClass="page-item"
					linkClass="page-link"
				/>
			</div>
		</Fragment>
	);
};

export default Home;

// import React, { Fragment, useEffect, useState } from 'react';
// import MetaData from './layout/MetaData';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts } from '../actions/productActions';
// import Product from './product/Product';
// import Loader from './layout/Loader';
// import { useAlert } from 'react-alert';
// import Pagination from 'react-js-pagination';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';

// const { createSliderWithTooltip } = Slider;
// const Range = createSliderWithTooltip(Slider.Range);

// const Home = ({ match }) => {
// 	const [ currentPage, setCurrentPage ] = useState(1);
// 	const [ price, setPrice ] = useState([ 1, 1000 ]);
// 	const dispatch = useDispatch();
// 	const alert = useAlert();
// 	const { products, loading, error, productCount, resPerPage } = useSelector((s) => s.products);
// 	const keyword = match.params.keyword;
// 	useEffect(
// 		() => {
// 			if (error) {
// 				return alert.error(error);
// 			}
// 			dispatch(getProducts(keyword, currentPage, price));
// 		},
// 		[ dispatch, alert, error, currentPage, keyword, price ]
// 	);

// 	function setCurrentPageNo(pageNumber) {
// 		setCurrentPage(pageNumber);
// 	}

// 	return loading ? (
// 		<Loader />
// 	) : (
// 		<Fragment>
// 			<MetaData title={'Buy Best Products'} />
// 			<h1 id="products_heading">Latest Products</h1>

// 			<section id="products" className="container mt-5">
// 				<div className="row">
// 					{products &&
// 						products.map((p) => {
// 							return <Product key={p._id} p={p} />;
// 						})}
// 				</div>
// 			</section>

// 			<div className="d-flex justify-content-center mt-5">
// 				<Pagination
// 					activePage={currentPage}
// 					itemsCountPerPage={resPerPage}
// 					totalItemsCount={productCount}
// 					onChange={setCurrentPageNo}
// 					nextPageText={'Next'}
// 					prevPageText={'Previous'}
// 					firstPageText={'First'}
// 					lastPageText={'Last'}
// 					itemClass="page-item"
// 					linkClass="page-link"
// 				/>
// 			</div>
// 		</Fragment>
// 	);
// };

// export default Home;
