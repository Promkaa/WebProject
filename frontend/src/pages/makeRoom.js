import React from "react";

class MkRoom extends React.Component {
  state = {
    step: 'mkRoom',
    roomName: '',
    roomCode: ''
  };

  handleCreateRoom = () => {
    this.setState({ step: 'createRoom' });
  };

  // Обработчик для подключения к комнате
  handleJoinRoom = () => {
    this.setState({ step: 'joinRoom' });
  };

  // Обработчик создания комнаты
  handleSubmitCreate = () => {
    if (this.state.roomName.trim()) {
      console.log("Создаем комнату:", this.state.roomName);
      // Здесь будет логика создания комнаты
      alert(`Комната "${this.state.roomName}" создана!`);
      // Можно вернуться в меню или перейти в созданную комнату
      this.setState({ step: 'mkRoom', roomName: '' });
    } else {
      alert("Введите название комнаты");
    }
  };

  // Обработчик подключения к комнате
  handleSubmitJoin = () => {
    if (this.state.roomCode.trim()) {
      console.log("Подключаемся к комнате:", this.state.roomCode);
      // Здесь будет логика подключения к комнате
      alert(`Подключение к комнате ${this.state.roomCode}...`);
      // Можно вернуться в меню или перейти в комнату
      this.setState({ step: 'mkRoom', roomCode: '' });
    } else {
      alert("Введите код комнаты");
    }
  };

  // Обработчик возврата в меню
  handleBack = () => {
    this.setState({ 
      step: 'mkRoom', 
      roomName: '', 
      roomCode: '' 
    });
  };

  // Обработчик изменения полей ввода
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Рендер главного меню
  rendermkRoom = () => {
    return (
      <div className="mkroom-mkRoom">
        <h2>Управление комнатой</h2>
        <button onClick={this.handleCreateRoom} className="create-room-btn">
          Создать комнату
        </button>
        <p>Создайте новую комнату и пригласите друзей</p>
        
        <button onClick={this.handleJoinRoom} className="join-room-btn">
          Подключиться к комнате
        </button>
        <p>Введите код комнаты для подключения</p>
      </div>
    );
  };

  // Рендер формы создания комнаты
  renderCreateRoom = () => {
    return (
      <div className="mkroom-create">
        <h2>Создание комнаты</h2>
        
        <div className="input-group">
          <label>Название комнаты:</label>
          <input
            type="text"
            name="roomName"
            value={this.state.roomName}
            onChange={this.handleInputChange}
            placeholder="Введите название комнаты"
            autoFocus
          />
        </div>
        
        <div className="button-group">
          <button onClick={this.handleSubmitCreate} className="submit-btn">
            Создать
          </button>
          <button onClick={this.handleBack} className="cancel-btn">
            Отмена
          </button>
        </div>
      </div>
    );
  };

  // Рендер формы подключения к комнате
  renderJoinRoom = () => {
    return (
      <div className="mkroom-join">
        <h2>Подключение к комнате</h2>
        
        <div className="input-group">
          <label>Код комнаты:</label>
          <input
            type="text"
            name="roomCode"
            value={this.state.roomCode}
            onChange={this.handleInputChange}
            placeholder="Введите код комнаты"
            autoFocus
          />
        </div>
        
        <div className="button-group">
          <button onClick={this.handleSubmitJoin} className="submit-btn">
            Подключиться
          </button>
          <button onClick={this.handleBack} className="cancel-btn">
            Отмена
          </button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="mkroom-container">
        <title>Комната</title>
        
        {this.state.step === 'mkRoom' && this.rendermkRoom()}
        {this.state.step === 'createRoom' && this.renderCreateRoom()}
        {this.state.step === 'joinRoom' && this.renderJoinRoom()}
      </div>
    );
  }
}

export default MkRoom;