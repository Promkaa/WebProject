import React from "react";
import Pleer from "../components/pleer";
import Poisk from "./poisk";
import MkRoom from "./makeRoom";
import Myplaylist from "./myPlaylist";
import TekushiyPL from "./TekushiyPlayList";

//надо кнопки перенести в отдельный файл, чтобы их можно было использовать на каждой странице

class MainStr extends React.Component{

    state = {
        showSearch: false,
        showMkRoom: false,
        showMyPlaylist: false,
        showPlayList: false
    }

    openSearchPage = () => {
        this.setState({showSearch: true})
    }

    closeSearchPage = () => {
        this.setState({showSearch: false})
    }

    openMkRoom = () => {
        this.setState({showMkRoom: true})
    }

    closeMkRoom = () => {
        this.setState({showMkRoom: false})
    }

    openMyPlaylist = () => {
        this.setState({showMyPlaylist: true})
    }

    closeMyPlaylist = () => {
        this.setState({showMyPlaylist: false})
    }

    openTekPlayList = () => {
        this.setState({showPlayList: true})
    }

    closeTekPlayList = () => {
        this.setState({showPlayList: false})
    }

    handleLogout = () => {

        if (this.props.onLogout) {
            this.props.onLogout();
        }
    }

    render() {
        if (this.state.showSearch) {
            return <Poisk onBack={this.closeSearchPage} />
        }
        
        if (this.state.showMkRoom) {
            return <MkRoom onBack={this.closeMkRoom} />
        }
        
        if (this.state.showMyPlaylist) {
            return <Myplaylist onBack={this.closeMyPlaylist} />
        }
        
        if (this.state.showPlayList) {
            return <TekushiyPL onBack={this.closeTekPlayList} />
        }
        
        return (
            <div className="MainStr">
                <button className="searchMus" onClick={this.openSearchPage}>
                    Поиск музыки
                </button>
                <button className="MkRoom" onClick={this.openMkRoom}>
                    Создание комнаты
                </button>
                <button className="MyPlaylist" onClick={this.openMyPlaylist}>
                    Мои плейлисты
                </button>
                <button className="Playlist" onClick={this.openTekPlayList}>
                    Текущий плейлист
                </button>
                <button className="exit" onClick={this.handleLogout}>
                    Выйти
                </button>
                
                <Pleer />
            </div>
        )
    }
}

export default MainStr;