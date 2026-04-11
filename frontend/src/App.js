import React from 'react';
import Login from './pages/login';
import MainStr from './pages/main';
import './index';
import './css/main.css';

class App extends React.Component {
  state = {
    isLoggedIn: false, 
    username: ''
  };

  handleLogin = (username) => {
    this.setState({ 
      isLoggedIn: true,
    username: username });
  };

  handleLogout = () => {
    this.setState({ 
      isLoggedIn: false,
      username: '' });
  };

  render() {
    const { isLoggedIn, username } = this.state;

    return (
      <div>
        {isLoggedIn ? (
          <MainStr onLogout={this.handleLogout} username={username} />  
        ) : (
          <Login onLogin={this.handleLogin} />     
        )}
      </div>
    );
  }
}

export default App;