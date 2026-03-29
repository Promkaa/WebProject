import React from "react";
import Pleer from "../components/pleer"

class MainStr extends React.Component{
    render(){
        return(<div className="MainStr">
            <button className="searchMus">Поиск музыки</button>
            <button className="golosa">Голосование</button>
            <button className="MyPlaylist">Мои плейлисты</button>
            <button className="Playlist">Текущий плейлист</button>
            <button className="exit">Выйти</button>
            <Pleer />
        </div>)
    }
}

export default MainStr