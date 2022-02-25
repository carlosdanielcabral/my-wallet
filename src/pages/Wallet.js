import React from 'react';
import Header from '../components/Header';
import ExpensesForm from '../components/ExpensesForm';
import ExpenseEditForm from '../components/ExpenseEditForm';
import ExpensesTable from '../components/ExpensesTable';
import '../styles/wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      expense: '',
    };
  }

  end = () => {
    this.setState({ editing: false });
  }

  start = (expense) => {
    this.setState({ editing: true, expense });
  }

  render() {
    const { editing, expense } = this.state;
    return (
      <div className="wallet-page">
        <Header />
        <main>
          {
            editing
              ? <ExpenseEditForm expense={ expense } end={ this.end } />
              : <ExpensesForm />
          }
          <ExpensesTable start={ this.start } />
        </main>
      </div>
    );
  }
}

export default Wallet;
