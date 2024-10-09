const ProductTransaction = require("../models/ProductTransaction");

const getTransactions = async (req, res) => {
  const { month, search, year, page = 1, perPage = 10 } = req.query;

  const searchQuery = {};

  // Handle year filtering
  if (year) {
    const startDate = new Date(year, 0, 1); // Start of the year
    const endDate = new Date(year, 11, 31); // End of the year
    searchQuery.dateOfSale = { $gte: startDate, $lte: endDate };
  }

  // Handle month filtering (if year is also provided)
  if (month) {
    const startDate = new Date(`${month} 1, ${year}`); // Use the year in the date string
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );
    searchQuery.dateOfSale = { $gte: startDate, $lte: endDate };
  }

  // Handle search filtering
  if (search) {
    searchQuery.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { price: { $regex: search, $options: "i" } },
    ];
  }

  try {
    const transactions = await ProductTransaction.find(searchQuery)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    const total = await ProductTransaction.countDocuments(searchQuery);

    res.status(200).json({ transactions, total, page, perPage });
  } catch (error) {
    res.status(500).json({ error: "Error fetching transactions" });
  }
};

module.exports = { getTransactions };
