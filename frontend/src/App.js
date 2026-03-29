import React from 'react';
import Login from './pages/login';
import MainStr from './pages/main';
import './index';
import './css/main.css';

class App extends React.Component {
  state = {
    isLoggedIn: false  // Состояние авторизации
  };

  // Функция для входа
  handleLogin = () => {
    // Здесь можно добавить проверку логина/пароля
    this.setState({ isLoggedIn: true });
  };

  // Функция для выхода
  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div>
        {isLoggedIn ? (
          <MainStr onLogout={this.handleLogout} />  // Передаем функцию выхода
        ) : (
          <Login onLogin={this.handleLogin} />       // Передаем функцию входа
        )}
      </div>
    );
  }
}

export default App;