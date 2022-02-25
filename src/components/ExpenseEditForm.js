import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpense } from '../actions';
import '../styles/expenses-form.css';

class ExpensesEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      wallet: props.expense,
      currencies: [],
    };
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies = async () => {
    const { expense } = this.props;
    const currencies = Object.keys(expense.exchangeRates);
    const index = currencies.indexOf('USDT');
    currencies.splice(index, 1);
    this.setState({ currencies });
  };

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((prevState) => ({
      wallet: {
        ...prevState.wallet,
        [name]: value,
      },
    }));
  }

  render() {
    const {
      wallet,
      currencies,
    } = this.state;

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = wallet;

    const { edit, end } = this.props;

    return (
      <form className="expenses-form edit">
        <label htmlFor="value">
          Valor

          <input
            type="number"
            value={ value }
            name="value"
            onChange={ this.handleChange }
            data-testid="value-input"
            id="value"
            placeholder="Digite aqui"
          />
        </label>

        <label htmlFor="description">
          Descrição
          <input
            type="text"
            value={ description }
            name="description"
            onChange={ this.handleChange }
            data-testid="description-input"
            id="description"
            placeholder="Digite aqui"
          />
        </label>

        <label htmlFor="currency">
          Moeda
          <select
            value={ currency }
            name="currency"
            onChange={ this.handleChange }
            data-testid="currency-input"
            id="currency"
          >
            {
              currencies.map((curr) => (
                <option data-testid={ curr } key={ curr } value={ curr }>
                  { curr }
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento
          <select
            value={ method }
            name="method"
            onChange={ this.handleChange }
            data-testid="method-input"
            id="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria
          <select
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
            data-testid="tag-input"
            id="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button
          type="submit"
          className="button submit"
          data-testid="edit-btn"
          onClick={ (e) => {
            e.preventDefault();
            edit(wallet);
            end();
          } }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

ExpensesEditForm.propTypes = {
  expense: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  edit: PropTypes.func.isRequired,
  end: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  edit: (expense) => dispatch(editExpense(expense)),
});

export default connect(null, mapDispatchToProps)(ExpensesEditForm);
