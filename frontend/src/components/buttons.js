import React from "react"
import Poisk from "../pages/poisk";
import Golosa from "../pages/golosa";
import Myplaylist from "../pages/myPlaylist";
import TekushiyPL from "../pages/TekushiyPlayList";
import Login from "../pages/login";

class Buttons extends React.Component{

    state = {
        showSearch: false,
        showGolosa: false,
        showMyPlaylist: false,
        showPlayList: false
    }

    openSearchPage = () => {
        this.setState({showSearch: true})
    }

    closeSearchPage = () => {
        this.setState({showSearch: false})
    }

    openGolosa = () => {
        this.setState({showGolosa: true})
    }

    closeGolosa = () => {
        this.setState({showGolosa: false})
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
        // Проверяем какая страница должна отображаться
        if (this.state.showSearch) {
            return <Poisk onBack={this.closeSearchPage} />
        }
        
        if (this.state.showGolosa) {
            return <Golosa onBack={this.closeGolosa} />
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
                <button className="golosa" onClick={this.openGolosa}>
                    Голосование
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
            </div>
        )
    }
}

export default Buttons