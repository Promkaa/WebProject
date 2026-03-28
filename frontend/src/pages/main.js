import React from "react";
import Pleer from "../components/pleer"

class MainStr extends React.Component{
    render(){
        return(<div className="MainStr">
            <button className="searchMus">Поиск музыки</button>
            <button className="MyPlaylist">Мой плейлист</button>
            <button className="friendPlaylist">Плейлисты друзей</button>
            <button className="exit">Выйти</button>
            <Pleer />
        </div>)
    }
}

export default MainStr