import React from "react";

class MainStr extends React.Component{
    render(){
        return(<div className="MainStr">
            <button className="searchMus">Поиск музыки</button>
            <button className="MyPlaylist">Мой плейлист</button>
            <button className="friendPlaylist">Плейлисты друзей</button>
            <button className="exit">Выйти</button>
        </div>)
    }
}

export default MainStr