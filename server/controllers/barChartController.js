const ProductTransaction = require("../models/ProductTransaction");

const getBarChartData = async (req, res) => {
  const { month } = req.query;

  if (!month) return res.status(400).json({ error: "Month is required" });

  const startDate = new Date(`${month} 1`);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    0
  );

  const priceRanges = {
    "0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "401-500": 0,
    "501-600": 0,
    "601-700": 0,
    "701-800": 0,
    "801-900": 0,
    "901+": 0,
  };

  try {
    const transactions = await ProductTransaction.find({
      dateOfSale: { $gte: startDate, $lte: endDate },
    });

    transactions.forEach((item) => {
      if (item.price >= 0 && item.price <= 100) priceRanges["0-100"]++;
      else if (item.price >= 101 && item.price <= 200) priceRanges["101-200"]++;
      else if (item.price >= 201 && item.price <= 300) priceRanges["201-300"]++;
      // ... and so on for other price ranges
      else priceRanges["901+"]++;
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching bar chart data" });
  }
};

module.exports = { getBarChartData };
