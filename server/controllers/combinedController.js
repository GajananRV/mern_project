const { getTransactions } = require("./transactionController");
const { getStatistics } = require("./statisticsController");
const { getBarChartData } = require("./barChartController");
const { getPieChartData } = require("./pieChartController");

const getCombinedData = async (req, res) => {
  try {
    const transactions = await getTransactions(req, res);
    const statistics = await getStatistics(req, res);
    const barChartData = await getBarChartData(req, res);
    const pieChartData = await getPieChartData(req, res);

    res
      .status(200)
      .json({ transactions, statistics, barChartData, pieChartData });
  } catch (error) {
    res.status(500).json({ error: "Error fetching combined data" });
  }
};

module.exports = { getCombinedData };
