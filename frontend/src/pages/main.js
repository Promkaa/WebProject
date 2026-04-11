import React from "react";
import Pleer from "../components/pleer";

//надо кнопки перенести в отдельный файл, чтобы их можно было использовать на каждой странице

class MainStr extends React.Component{

    render() {     
        return (
            <div className="MainStr">            
                <Pleer />
            </div>
        )
    }
}

export default MainStr;