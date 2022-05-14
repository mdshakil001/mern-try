const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new order   =>  /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
	const { orderItems, shippingInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentInfo } = req.body;

	const order = await Order.create({
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
		paidAt: Date.now(),
		user: req.user._id
	});

	res.status(200).json({
		success: true,
		order
	});
});

// Get single order   =>   /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
	console.log("req(single order) === > ", req);

	const order = await Order.findById(req.params.id).populate('user');
	// const order = await Order.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler('No Order found with this ID', 404));
	}
	// const user = await User.findOne({ _id })

	res.status(200).json({
		success: true,
		order
	});
});

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
	// console.log("req === > ", req);
	const orders = await Order.find({ user: req.user.id });

	res.status(200).json({
		success: true,
		count: orders.length,
		orders: orders
	});
});


// Get all orders - ADMIN  =>   /api/v1/admin/orders/
exports.adminGetAllOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find();

	let totalAmount = 0;

	orders.forEach((order) => {
		totalAmount += order.totalPrice;
	});

	res.status(200).json({
		success: true,
		totalAmount,
		total_orders: orders.length,
		orders
	});
});

// Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
exports.adminUpdateOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);
	// console.log("order === ", order);

	if (order.orderStatus === 'Delivered') {
		return next(new ErrorHandler('You have already delivered this order', 400));
	}

	order.orderItems.forEach(async (item) => {
		await updateStock(item.product, item.quantity);
	});

	(order.orderStatus = req.body.status), (order.deliveredAt = Date.now());

	await order.save();

	res.status(200).json({
		success: true
	});
});

async function updateStock(id, quantity) {
	const product = await Product.findById(id);

	if (product.stock >= 1) {
		product.stock = product.stock - quantity;
	}

	await product.save({ validateBeforeSave: false });
}

// Delete order   =>   /api/v1/admin/order/:id
exports.adminDeleteOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler('No Order found with this ID', 404));
	}

	await order.remove();

	res.status(200).json({
		success: true
	});
});