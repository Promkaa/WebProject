import React from 'react';
import Login from './pages/login';
import MainStr from './pages/main';
import Poisk from "./pages/poisk";
import MkRoom from "./pages/makeRoom";
import TekushiyPL from "./pages/TekushiyPlayList";
import Navigation from './components/Navigation';
import './index';
import './css/main.css';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    username: '',
    currentPage: 'main'
  };

  handleLogin = (username) => {
    this.setState({ 
      isLoggedIn: true,
      username: username,
      currentPage: 'main'
    });
  };

  handleLogout = () => {
    this.setState({ 
      isLoggedIn: false,
      username: '',
      currentPage: 'main'
    });
  };

  navigateTo = (page) => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    const { currentPage } = this.state;
    
    switch(currentPage) {
      case 'main':
        return <MainStr username={this.state.username} onLogout={this.handleLogout} />;
      case 'search':
        return <Poisk onBack={() => this.navigateTo('main')} />;
      case 'mkRoom':
        return <MkRoom onBack={() => this.navigateTo('main')} />;
      case 'playlist':
        return <TekushiyPL onBack={() => this.navigateTo('main')} />;
      default:
        return <MainStr username={this.state.username} onLogout={this.handleLogout} />;
    }
  };

  render() {
    const { isLoggedIn, username } = this.state;

    if (!isLoggedIn) {
      return <Login onLogin={this.handleLogin} />;
    }

    return (
      <div className="app-container">
        <Navigation 
          onMain={() => this.navigateTo('main')}   
          onSearch={() => this.navigateTo('search')}
          onMkRoom={() => this.navigateTo('mkRoom')}
          onPlaylist={() => this.navigateTo('playlist')}
          onLogout={this.handleLogout}
          username={username}
        />
        <div className="page-content">
          {this.renderPage()}
        </div>
      </div>
    );
  }
}

export default App;