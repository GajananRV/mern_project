const express = require("express");
const { seedData } = require("../controllers/seedController");
const { getTransactions } = require("../controllers/transactionController");
const { getStatistics } = require("../controllers/statisticsController");
const { getBarChartData } = require("../controllers/barChartController");
const { getPieChartData } = require("../controllers/pieChartController");
const { getCombinedData } = require("../controllers/combinedController");

const router = express.Router();

router.get("/transactions", getTransactions);
router.get("/statistics", getStatistics);
router.get("/barchart", getBarChartData);
router.get("/piechart", getPieChartData);
router.get("/combined", getCombinedData);

module.exports = router;
