import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TransactionTable from '../../components/TransactionTable';

const transactions = [
  { id: 1, type: 'consumption', amount: '100' },
  { id: 2, type: 'income', amount: '100' },
  { id: 3, type: 'consumption', amount: '1000' },
  { id: 4, type: 'income', amount: '500' },
  { id: 5, type: 'income', amount: '100' },
  { id: 6, type: 'consumption', amount: '300' },
];

const TransactionHistory = props => {
  return (
    <div>
      <Header />
      <TransactionTable transactions={transactions} />
      <Link to='/dashboard'>Dashboard</Link>
    </div>
  );
};

export default TransactionHistory;
