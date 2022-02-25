import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';
import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);

    this.state = {
      email: '',
      password: '',
      isButtonDisable: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState((prevState) => {
      const { password, email } = prevState;
      const valid = this.validateInput(name, value, password, email);
      this.setState({ [name]: value, isButtonDisable: !valid });
    });
  }

  handleSubmit(event) {
    const { submitData, history } = this.props;
    const { email, password } = this.state;

    event.preventDefault();
    submitData(email, password);

    history.push('/carteira');
  }

  validateInput(name, value, password, email) {
    const MIN_PASSWORD_LENGTH = 6;
    const emailRegex = /\w*@\w*.com/i;

    if (name === 'password') {
      const validPassword = value.length >= MIN_PASSWORD_LENGTH;
      const validEmail = emailRegex.test(email);
      const validData = validPassword && validEmail;
      return validData;
    }

    const validPassword = password.length >= MIN_PASSWORD_LENGTH;
    const validEmail = emailRegex.test(value);
    const validData = validPassword && validEmail;
    return validData;
  }

  render() {
    const { email, password, isButtonDisable } = this.state;
    return (
      <div className="login-container">
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
            className="input email"
            placeholder="Digite aqui seu email"
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
            className="input password"
            placeholder="Digite aqui sua senha"
          />

          <button
            type="submit"
            className="button submit"
            onClick={ this.handleSubmit }
            disabled={ isButtonDisable }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  submitData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitData: (email, password) => dispatch(loginAction(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);
