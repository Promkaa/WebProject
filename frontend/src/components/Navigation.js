import React from 'react';
import Nick from './nick';

const Navigation = ({ onSearch, onMkRoom, onMyPlaylist, onPlaylist, onMain, onLogout, username }) => {
  return (
    <nav className='navigation'>
      <div className="nav_burrons">
        <button onClick={onMain}>Главная страница</button>
        <button onClick={onSearch}>Поиск музыки</button>
        <button onClick={onMkRoom}>Создание комнаты</button>
        <button onClick={onMyPlaylist}>Мои плейлисты</button>
        <button onClick={onPlaylist}>Текущий плейлист</button>
        <button onClick={onLogout}>Выйти</button>
      </div>
      <div className='nick_in_nav'>
        <Nick username={username} />
      </div>
    </nav>
  );
};

export default Navigation;