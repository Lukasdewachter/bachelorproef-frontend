import React from "react";
import { Link } from "react-router-dom";
//import axios from 'axios'
import{Component} from 'react'
import './Home.css'

class Home extends Component{       
  nextPath(path){
    this.props.history.push(path);
  }
  render(){
    return (
      <div className="home">
      <h1>HOME</h1>
      <img className='chemie-foto' src={require('./images/Home-chemie-foto.jpeg')} alt='chemie home foto'/>
      <p>Van hier naar andere pagina's navigeren</p>
      <Link to="/login"><button className='btn-login' onClick={() => this.nextPath('/login')}>Login</button></Link>
     </div>
    );
  }
}
export default Home;