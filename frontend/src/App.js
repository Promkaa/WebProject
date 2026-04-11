import React from 'react';
import Login from './pages/login';
import MainStr from './pages/main';
import './index';
import './css/main.css';

class App extends React.Component {
  state = {
    isLoggedIn: false 
  };

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div>
        {isLoggedIn ? (
          <MainStr onLogout={this.handleLogout} />  
        ) : (
          <Login onLogin={this.handleLogin} />     
        )}
      </div>
    );
  }
}

export default App;