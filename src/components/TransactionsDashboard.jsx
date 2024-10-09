// src/components/TransactionsDashboard.jsx
import './TransactionsDashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './BarChart';
import PieChart from './PieChart';
import TransactionList from './TransactionList';

const TransactionsDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('March'); // Default to March
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  const [page, setPage] = useState(1); // Pagination state
  const [perPage] = useState(10); // Items per page

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2, new Date().getFullYear() - 3, new Date().getFullYear() - 4];

  // Fetch Transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:4444/api/transactions`, {
          params: { page, perPage, search: searchTerm, month: selectedMonth, year: selectedYear },
        });
        setTransactions(response.data.transactions);
        console.log('Fetched Transactions:', response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, [page, perPage, searchTerm, selectedMonth, selectedYear]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Example data for charts (replace this with real data)
  const chartData = {
    labels: transactions.map(transaction => transaction.title), // Titles as labels
    datasets: [
      {
        label: 'Sales',
        data: transactions.map(transaction => transaction.price), // Prices as data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Pie chart data
  const pieChartData = {
    labels: ['Sold', 'Unsold'],
    datasets: [{
      data: [
        transactions.filter(transaction => transaction.sold).length,
        transactions.filter(transaction => !transaction.sold).length
      ],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
    }],
  };

  

  return (
    <div className="transaction-dashboard">
      <h2>Transaction Dashboard</h2>
      
      <div className="search-and-filter">
        {/* Search Transaction Input */}
        <input
          type="text"
          placeholder="Search transaction"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        
        {/* Select Month Dropdown */}
        <select value={selectedMonth} onChange={handleMonthChange} className="month-select">
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        {/* Select Year Dropdown */}
        <select value={selectedYear} onChange={handleYearChange} className="year-select">
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions List */}
      <TransactionList transactions={transactions} />

      {/* Charts Section */}
      <div className="charts">
        <h3>Sales Bar Chart</h3>
        <BarChart data={chartData} />

        <h3>Sold vs Unsold Pie Chart</h3>
        <PieChart data={pieChartData} />
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page No: {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsDashboard;
