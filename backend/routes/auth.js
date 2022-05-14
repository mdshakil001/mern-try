const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	getUserProfile,
	updatePassword,
	updateProfile,
	logout,
	
	adminGetAllUsers,
	adminGetUserDetails,
	adminUpdateUser,
	adminDeleteUser
} = require('../controllers/authController');
const { forgotPassword, resetPassword } = require('../controllers/fotgotPass');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/logout').get(logout);

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), adminGetAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), adminGetUserDetails);
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRoles('admin'), adminUpdateUser);
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), adminDeleteUser);

module.exports = router;