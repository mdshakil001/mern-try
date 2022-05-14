const express = require('express');
const dbConnect = require('./config/database');
const errorMiddlewares = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });

// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

dbConnect();

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// middleware to handle errors !
app.use(errorMiddlewares);

module.exports = {
	app,
	dbConnect
};
