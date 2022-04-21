import React from "react";
import './Home.css'

const Home= () =>{ 
  var axios = require('axios');
var data = JSON.stringify({
  "username": "lukas@mail.com",
  "password": "wachtwoord"
});

var config = {
  method: 'post',
  url: 'http://localhost:8080/authenticate',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
const login = () => {
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
}
  return (
    <div className="home">
      <h1>HOME</h1>
      <img className='chemie-foto' src={require('./images/Home-chemie-foto.jpeg')} alt='chemie home foto'/>
      <p>Van hier naar andere pagina's navigeren</p>
      <button onClick={login}>login</button>
    </div>
    );
}
export default Home;