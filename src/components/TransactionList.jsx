const TransactionList = ({ transactions }) => {
  console.log('Received Transactions:', transactions); // Log the received transactions

  // Check if transactions is an array and has length
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return (
      <div className="no-transactions">
        <p>No transactions available.</p>
      </div>
    );
  }

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Sold</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction._id}> {/* Use _id for the key */}
            <td>{transaction.id}</td>
            <td>{transaction.title}</td>
            <td>{transaction.description}</td>
            <td>${transaction.price.toFixed(2)}</td> {/* Format price */}
            <td>{transaction.category}</td>
            <td>{transaction.sold ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default TransactionList;