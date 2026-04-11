import React from "react";
import Pleer from "../components/pleer";

//главная страница пустая 

class MainStr extends React.Component{

    render() {     
        return (
            <div className="MainStr">            
                <title>Плейлист-коллаборатор</title>
                <h1>Добро пожаловать</h1>
                <p>Выбери в панели сверху куда ты хочешь попасть</p>
                <Pleer />
            </div>
        )
    }
}

export default MainStr;