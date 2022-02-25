// Coloque aqui suas actions
import fetchData from '../services/api';

export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const loginAction = (email, password) => ({ type: ACTION_LOGIN, email, password });

export const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  currencies,
});

export const addExpense = (expense, exchangeRates) => ({
  type: ADD_EXPENSE,
  expense: {
    ...expense,
    exchangeRates,
  },
});

export const submitExpense = (expense) => (
  async (dispatch) => {
    try {
      const data = await fetchData();
      dispatch(addExpense(expense, data));
    } catch (e) {
      console.log(e);
    }
  });

export const submitCurrencies = () => (
  async (dispatch) => {
    try {
      const data = await fetchData();
      dispatch(addCurrencies(Object.keys(data)));
    } catch (e) {
      console.log(e);
    }
  }
);

export const removeExpense = (expense) => ({ type: REMOVE_EXPENSE, expense });

export const editExpense = (expense) => ({ type: EDIT_EXPENSE, expense });
