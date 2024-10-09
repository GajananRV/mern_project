const ProductTransaction = require("../models/ProductTransaction");

const getStatistics = async (req, res) => {
  const { month } = req.query;

  if (!month) return res.status(400).json({ error: "Month is required" });

  const startDate = new Date(`${month} 1`);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    0
  );

  try {
    const soldItems = await ProductTransaction.find({
      sold: true,
      dateOfSale: { $gte: startDate, $lte: endDate },
    });
    const notSoldItems = await ProductTransaction.find({
      sold: false,
      dateOfSale: { $gte: startDate, $lte: endDate },
    });

    const totalSoldAmount = soldItems.reduce(
      (acc, item) => acc + item.price,
      0
    );
    const totalSoldItems = soldItems.length;
    const totalNotSoldItems = notSoldItems.length;

    res
      .status(200)
      .json({ totalSoldAmount, totalSoldItems, totalNotSoldItems });
  } catch (error) {
    res.status(500).json({ error: "Error fetching statistics" });
  }
};

module.exports = { getStatistics };
