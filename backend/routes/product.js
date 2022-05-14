const express = require('express');
const router = express.Router();

const {
	getProducts,
	getSingleProduct,

	createProductReview,
	getProductReviews,
	deleteReview,

	adminCreateNewProduct,
	adminGetAllProducts,
	adminUpdateProduct,
	adminDeleteProduct
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// router.route('/products').get(isAuthenticatedUser, authorizeRoles('admin'), getProducts);
router.route('/products').get(getProducts);
router.route('/products/:id').get(getSingleProduct);

router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), adminGetAllProducts);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), adminCreateNewProduct);
// router.route('/admin/product/new').post(adminCreateNewProduct);

router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), adminUpdateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), adminDeleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;