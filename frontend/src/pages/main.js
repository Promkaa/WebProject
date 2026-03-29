import React from "react";
import Pleer from "../components/pleer"
import Poisk from "./poisk";

class MainStr extends React.Component{

    state = {
        showSearch: false
    }

    openSearchPage = () =>{
        this.setState({showSearch: true})
    }

    closeSearchPage = () => {
        this.setState({showSearch: false})
    }

    render(){
        if(this.state.showSearch){
            return<Poisk onBack={this.closeSearchPage} />
        }
        return(<div className="MainStr">
            <button className="searchMus" onClick={this.openSearchPage}>Поиск музыки</button>
            <button className="golosa">Голосование</button>
            <button className="MyPlaylist">Мои плейлисты</button>
            <button className="Playlist">Текущий плейлист</button>
            <button className="exit">Выйти</button>
            
            <Pleer />
        </div>)
    }
}

export default MainStr