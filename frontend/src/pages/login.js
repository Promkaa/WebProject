import React from "react";
import '../css/main.css'

class Login extends React.Component {
  state = {
    login: "",
    password: "",
    remember: false
  };

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({
      [name]: type === "checkbox" ? checked : value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    if (this.state.login && this.state.password) {
      console.log("Form submitted:", this.state);
      
      if (this.props.onLogin) {
        this.props.onLogin();
      }
    } else {
      alert("Пожалуйста, введите логин и пароль");
    }
  };

  render() {
    return (
      <div className="login">
        
        <form onSubmit={this.handleSubmit}>
            <center><header>Привет</header></center>
          <h1>Авторизация</h1>
          <div className="input-box">
            <input 
              type="text" 
              name="login"
              placeholder="Введите логин" 
              value={this.state.login}
              onChange={this.handleInputChange}
              required 
            />
          </div>

          <div className="input-box">
            <input 
              type="password"
              name="password" 
              placeholder="Введите пароль" 
              value={this.state.password}
              onChange={this.handleInputChange}
              required 
            />
          </div>

          <div className="remember">
            <input 
              type="checkbox" 
              name="remember"
              checked={this.state.remember}
              onChange={this.handleInputChange}
            />Запомнить меня (не запомним)
          </div>

          <button type="submit">Войти</button>

          <div className="register-link">
            <center><p>Нет аккаунта?</p></center>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;