const Product = require("../models/product");
const dotenv = require("dotenv");
const { dbConnect } = require("../app");

const products = require("../data/products");

// Setting dotenv file
// dotenv.config({ path: "backend/config/config.env" });

dbConnect();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All Products are added.");

    process.exit();
  } catch (error) {
    console.log("error seedser == ", error.message);
    process.exit();
  }
};

seedProducts();
