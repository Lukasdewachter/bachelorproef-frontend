import React from "react";
import './Home.css'


const Home= () =>{ 
  return (
    <div className="home">
      <h1>HOME</h1>
      <img className='chemie-foto' src={require('./images/Home-chemie-foto.jpeg')} alt='chemie home foto'/>
      <p>Van hier naar andere pagina's navigeren</p>
      
    </div>
    );
}
export default Home;