import React from 'react';

const TransactionRecord = ({ transaction }) => {
  const { id, type, amount } = transaction;
  return (
    <tr>
      <td>{id}</td>
      <td>{type}</td>
      <td>{amount}</td>
    </tr>
  );
};

export default TransactionRecord;
