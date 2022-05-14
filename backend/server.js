const { app } = require('./app');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

dotenv.config({ path: 'backend/config/config.env' });

// Setting Up Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});
