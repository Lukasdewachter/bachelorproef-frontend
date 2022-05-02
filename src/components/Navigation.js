import React, {useState} from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import '../components/MainStyleSheet.css'

const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
    }
});

function Navigation() {
  const [modal, setModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const toggleLogin = () =>{
    setLoggedIn(!login)
    setModal(!modal)
  }
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  const loginChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newFormData = {...login};
    newFormData[fieldName] = fieldValue;
    setLogin(newFormData);
  }
  const loginService = (event) => {
    event.preventDefault();
    api.post(`http://localhost:8080/authenticate`,{
      username: login.username,
      password: login.password
    })
    .then(function (response) {
      localStorage.setItem("user", JSON.stringify(response.data))
      window.location.reload(false)
      event.setLoggedIn(true)
  })
    .catch(function (error) {
      console.log(error);
      });
    setLoggedIn(true);
    };
  const [userInfo, setUserInfo] = useState(false);
  const userInformation = () =>{
    setUserInfo(!userInfo)
  }
  const logout = () =>{
    setLoggedIn(false);
    localStorage.removeItem('user');
    window.location.reload(false);
  }
  const setLoggedInn = () =>{
    setLoggedIn(true);
}
  return (
    
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark">  
          <div className="container">
            <img className='kuleuven-logo' src={require('./images/kuleuven-logo.png')} alt='kuleuven logo' />
            <h4 className='mpt'>Thesis Platform</h4>
            <button onClick={setLoggedInn}>X</button>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                    <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Thesis-List">
                    Thesis list
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Students">
                   Students
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Professors">
                    Professors
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Companies">
                    Companies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/FAQ">
                    FAQ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Contact">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
            {!loggedIn && (
              <button onClick={toggleLogin} className="btn-login">Login</button>)}
            {loggedIn && (
              <button onClick={userInformation} className="btn-logout">User</button>)}
          </div>
      </nav>
      {userInfo &&(
        <div className = 'userInfo'>
            <ul>
              <h2>User Info</h2>
            </ul>
            <ul>
              <button onClick={logout}>uitloggen</button>
            </ul>
        </div>
      )}
      {modal && (
      <div  className="div-login">
              <div  className="div-overlay">
                <div className="login-content">
                <div className="box-login">
                    <h2>Login</h2>
                    <form onSubmit={loginService} className="form-login">
                        <label>Email</label>
                        <input
                            type='email'
                            name='username'
                            required='required'
                            placeholder='email'
                            onChange={loginChange}
                        />
                        <label>Password</label>
                        <input
                            type='password'
                            name='password'
                            required='required'
                            placeholder='password'
                            onChange={loginChange}
                        />
                        <input className="btn-login-2" type="submit" value="login" />
                    </form>
                </div>
                  <button onClick={toggleLogin}>X</button>
                </div>
              </div>
            </div>
            )}
      </div>
    );
}

export default Navigation;