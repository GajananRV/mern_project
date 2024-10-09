import React, { useState, useEffect } from "react";
import { fetchStatistics } from "../utils/api";

const Statistics = () => {
  const [month, setMonth] = useState("");
  const [statistics, setStatistics] = useState({
    totalSoldAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (month) {
        const { data } = await fetchStatistics({ month });
        setStatistics(data);
      }
    };

    fetchData();
  }, [month]);

  return (
    <div>
      <h2>Statistics</h2>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        placeholder="Select Month"
      />
      <div>
        <p>Total Sold Amount: {statistics.totalSoldAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default Statistics;
