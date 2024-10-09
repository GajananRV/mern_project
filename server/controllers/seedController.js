const axios = require("axios");
const Product = require("../models/ProductTransaction"); // Assuming you have a Product model

// Function to fetch data from third-party API and seed the database
const seedData = async () => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;

    // Assuming you have a Product model, you can modify this according to your schema
    await Product.insertMany(transactions);

    console.log("Database has been seeded with transaction data.");
  } catch (error) {
    console.error("Error seeding data:", error.message);
  }
};

module.exports = { seedData };
