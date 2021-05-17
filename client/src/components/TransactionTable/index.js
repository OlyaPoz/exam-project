import React from 'react';
import TransactionRecord from './TransactionRecord';

const TransactionTable = ({ transactions }) => {
  return (
    <table>
      {transactions.map(transaction => (
        <TransactionRecord transaction={transaction} />
      ))}
    </table>
  );
};

export default TransactionTable;
