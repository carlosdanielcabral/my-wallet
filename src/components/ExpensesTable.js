import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';
import '../styles/expenses-table.css';

class ExpensesTable extends React.Component {
  render() {
    const { expenses, remove, start } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>
                  { expense.description }
                </td>

                <td>
                  { expense.tag }
                </td>

                <td>
                  { expense.method }
                </td>

                <td>
                  { parseFloat(expense.value).toFixed(2) }
                </td>

                <td>
                  { expense.exchangeRates[expense.currency].name.split('/')[0] }
                </td>

                <td>
                  {
                    parseFloat(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)
                  }
                </td>

                <td>
                  {
                    parseFloat(
                      expense.value * expense.exchangeRates[expense.currency].ask,
                    ).toFixed(2)
                  }
                </td>

                <td>
                  Real
                </td>

                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => {
                      start(expense);
                    } }
                  >
                    <span className="material-icons edit">
                      edit
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={ () => remove(expense) }
                    data-testid="delete-btn"
                  >
                    <span className="material-icons delete">
                      delete
                    </span>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
  ])).isRequired,
  remove: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (expense) => dispatch(removeExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
