const getPieChartData = async (req, res) => {
  const { month } = req.query;

  if (!month) return res.status(400).json({ error: "Month is required" });

  const startDate = new Date(`${month} 1`);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    0
  );

  try {
    const categories = {};
    const transactions = await ProductTransaction.find({
      dateOfSale: { $gte: startDate, $lte: endDate },
    });

    transactions.forEach((item) => {
      if (categories[item.category]) {
        categories[item.category]++;
      } else {
        categories[item.category] = 1;
      }
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pie chart data" });
  }
};

module.exports = { getPieChartData };
