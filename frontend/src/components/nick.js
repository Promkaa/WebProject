import React from "react";
import '../css/main.css'

// Показывает ник справа сверху, который ввел пользователь в окне входа

class Nick extends React.Component{
    render(){
        return(
            <div>
                <span className="Nickname">Ник: {this.props.username}</span>
            </div>
        )
    }
}

export default Nick;