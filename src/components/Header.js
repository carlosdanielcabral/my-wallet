import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/header.css';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <div className="row">
          <section className="logo">
            <h1>MyWallet</h1>
          </section>

          <section className="email">
            <h2 data-testid="email-field">
              { email }
            </h2>
          </section>
        </div>

        <div className="row">
          <div className="total">
            <p data-testid="total-field">
              {
                parseFloat(expenses.reduce((acc, value) => (
                  acc + Number(
                    value.exchangeRates[value.currency].ask * value.value,
                  )), 0)).toFixed(2)
              }
            </p>

            <p data-testid="header-currency-field">
              BRL
            </p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ])).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
