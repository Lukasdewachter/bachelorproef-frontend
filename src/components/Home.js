import React from "react";
//import axios from 'axios'
import{Component} from 'react'
import './Home.css'

class Home extends Component{       
  render(){
    return (
      <div className="home">
      <h1>HOME</h1>
      <img class='chemie-foto' src={require('./images/Home-chemie-foto.jpeg')} alt='chemie home foto'/>
      <p>Van hier naar andere pagina's navigeren</p>
     </div>
    );
  }
}
export default Home;