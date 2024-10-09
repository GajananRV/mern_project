const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/ProductTransaction");
const axios = require("axios");
const routes = require("./routes/routes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api", routes);
// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mern_project", {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
    try {
      const response = await axios.get(
        "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
      );
      const transactions = response.data;

      // Check if the Product collection is empty
      const count = await Product.countDocuments(); // or use Product.find().countDocuments()

      if (count === 0) {
        // Only insert data if the collection is empty
        await Product.insertMany(transactions);
        console.log("Database has been seeded with transaction data.");
      } else {
        console.log("Database is not empty. Skipping data seeding.");
      }
    } catch (error) {
      console.error("Error seeding data:", error.message);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

app.listen(4444, () => {
  console.log("Server is running on port 4444");
});
