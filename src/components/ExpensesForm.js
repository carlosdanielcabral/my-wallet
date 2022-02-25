import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitExpense } from '../actions';
import fetchData from '../services/api';
import '../styles/expenses-form.css';

class ExpensesForm extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      wallet: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
      currencies: [],
    };
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies = async () => {
    const data = await fetchData();
    const currencies = Object.keys(data);
    const index = currencies.indexOf('USDT');
    currencies.splice(index, 1);
    this.setState({ currencies });
  };

  handleSubmit(event) {
    const { submitData } = this.props;

    event.preventDefault();

    const { wallet } = this.state;
    submitData(wallet);

    this.setState((prevState) => ({
      wallet: {
        ...prevState.wallet,
        value: '',
      },
    }));
  }

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

    return (
      <form className="expenses-form">
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
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  submitData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitData: (data) => dispatch(submitExpense(data)),
});

export default connect(null, mapDispatchToProps)(ExpensesForm);
