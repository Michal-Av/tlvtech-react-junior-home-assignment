import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import './style.css';

import { getGames, deleteGame, addGames, editGame} from './game-service';


class App extends React.Component {
  state = {
    games: [],
    name: "",
    img: "",
    id: "",
    openEdit : false, openAdd : false,
  };

  componentDidMount = async () => {
    this.getGames();
  };

  getGames = async () => {
    const games = await getGames();
    this.setState({ games });
  }

  deleteGame = async id => {
    await deleteGame(id);
    this.getGames();
  };

  editGame = async (id, obj) => {
    await editGame(id ,obj);
    this.setState({ openEdit: false });
    this.getGames();
    
 };

  addGame = async (obj) => {
    await addGames(obj);
    this.setState({ openAdd: false });
    this.getGames();

  };



  openEditGame = (id) =>{
    this.setState({ openEdit: true });
    // console.log(id);
    this.state.games.forEach(item => 
    { if(item.id === id)
      this.setState({name: item.name, img: item.img, id: id});
    });
  };

  render() {
    const { games } = this.state;
    return (
      <div style={{ height: "100%",marginTop :0 , 
      backgroundImage: `url("https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")` 
    }}> 
    <br/>
        <h1 style={{ paddingLeft :"10px" }}>Games World</h1><br/>
        <button onClick={() => this.setState({openAdd : true})}>Add Movie</button>{" "} 
        <button onClick={() => this.setState({openAdd : false})}>All Movies</button>  <br/> <br/>
        <ul className='flex-container'>
        {!this.state.openEdit && !this.state.openAdd && games &&
          games.map(game => (
            <div className="cardfill"  key={game.id}>
            <li className="card" key={game.id}>
              <div className="cardback">
             <img className="media" src={game.img} alt="Logo" /><br/>
              <h3>{game.name}</h3>
              </div>
              <div className="cardcontinue">
              <div className='right'>
                <br />
              <button onClick={() => this.openEditGame(game.id)}>edit</button>{" "}  <br /> <br />
              <button onClick={() => this.deleteGame(game.id)}>delete</button>  <br />
              </div>
              </div>
            </li>
            </div>
          ))}
          </ul>
          <br/><br/>
          {this.state.openEdit && 
            <div style={{ marginLeft:40 }}>
           <div className="card" >
            <form onSubmit={e => customSubmit(e)}>
            <h3 className="element"> Edit Game:</h3>
            Name : <input className="element" value={this.state.name} type="text" name="name" onChange={e => this.setState({name : e.target.value})} /><br/>
            Image Url : <input className="element" value={this.state.img} type="text" name="image" onChange={e => this.setState({img : e.target.value})} /><br/>
            </form>
            <button className="element" onClick={()=> this.editGame(this.state.id, {name : this.state.name, img:  this.state.img})} >Save</button>
          </div>
          <br/><br/>   <br/><br/>
          </div>}
          
          {this.state.openAdd && 
          <div>
          <div className="card" style={{ marginLeft:40 }}>
            <div className="element"> Add New Game</div>
            <input className="element" type="text" name="name" onChange={e => this.setState({name : e.target.value})} placeholder="game name" /><br/>
            <input className="element" type="text" name="url" onChange={e => this.setState({img : e.target.value})} placeholder="Image url" /><br/>
            <button className="element" onClick={()=> this.addGame({name : this.state.name, img:  this.state.img})} >add new game</button>
          </div>
          <br/><br/> <br/><br/>
          </div>}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app-container'));
