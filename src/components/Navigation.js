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
  const [registerPage, setRegisterPage] = useState(false);
  const toggleRegister = () =>{
    setRegisterPage(!registerPage);
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
      window.location.reload();
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
    window.location.reload();
  }
  const setLoggedInn = () =>{
    setLoggedIn(true);
}
const [role, setRole] = useState({
  role:''
})
const [isCoordinator, setIsCoordinator] = useState(false);
const roleChange=(event)=>{
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    if(fieldValue === "professor"){
      setIsCoordinator(true)
    }else{setIsCoordinator(false)}
    const newFormData = {...role};
    newFormData[fieldName] = fieldValue;
    setRole(newFormData);
    
}
const registerService =()=>{
  api.post(`http://localhost:8080/`+role.role+"/add", {
    firstName: addData.firstName,
    lastName: addData.lastName,
    address: addData.address,
    tel: addData.tel,
    mail: addData.mail,
    fieldOfStudy: addData.fieldOfStudy,
    campus: addData.campus,
    password: addData.password,
    coordinator: addData.coordinator
  }).then(function(){setModal(false)})
  .catch(function(error){
    console.log(error);
  })
}
const [addData, setAddData] = useState({
  firstName: '',
  lastName: '',
  address: '',
  tel:'',
  mail: '',
  fieldOfStudy:'',
  campus:'',
  password:'',
  coordinator:''
});
const registerChange = (event) =>{
  event.preventDefault();
  const fieldName = event.target.getAttribute('name');
  const fieldValue = event.target.value;
  const newData = {...addData};
  newData[fieldName] = fieldValue;
  setAddData(newData);
};
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
              <button onClick={userInformation} className="btn-user">User</button>)}
          </div>
      </nav>
      {userInfo &&(
        <div className = 'userInfo'>
            <ul>
              <h2>User Info</h2>
            </ul>
            <ul>
              <button className="btn-logout" onClick={logout}>Log Out</button>
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
                    <p className="p-register">Don't have an account?</p>
                    <button className="btn-register" onClick={toggleRegister}>Register</button>
                </div>
                  <button className="btn-exit" onClick={toggleLogin}><ion-icon name="close-circle-outline"></ion-icon></button>
                </div>
              </div>
            </div>
            )}
        {registerPage && (
          <div  className="div-register">
              <div  className="div-overlay-register">
                <div className="register-content">
                <div className="box-register">
                    <h2>Register</h2>
                    <label className="label-role">Role</label>
                    <select name="role" onChange={roleChange} className="select-role">
                      <option value="" selected disabled hidden>Choose here</option>
                      <option value="student">Student</option>
                      <option value="professor">Professor</option>
                      <option value="company">Company</option>
                    </select>
                    <form onSubmit={registerService} className="form-login">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          required="required"
                          placeholder="first name"
                          onChange={registerChange}
                        />
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          required="required"
                          placeholder="last name"
                          onChange={registerChange}
                        />
                        <label>Email</label>
                        <input
                            type='email'
                            name='mail'
                            required='required'
                            placeholder='email'
                            onChange={registerChange}
                        />
                        <label>Tel Nr</label>
                        <input
                          type="text"
                          name="tel"
                          required="required"
                          placeholder="tel nr"
                          onChange={registerChange}
                        />
                        <label>Address</label>
                        <input
                          type="text"
                          name="address"
                          required="required"
                          placeholder="adress"
                          onChange={registerChange}
                        />
                        <label>Field Of Study</label>
                        <select className="select-FOS" name="fieldOfStudy" onChange={registerChange} >
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="Sociale Wetenschappen">Sociale Wetenschappen</option>
                            <option value="Burgerlijk Ingenieur">Burgerlijk Ingenieur</option>
                            <option value="Bio-ingenieur">Bio-ingenieur</option>
                            <option value="Industrieel Ingenieur">Industrieel Ingenieur</option>
                            <option value="Wetenschappen">Wetenschappen</option>
                            <option value="Architectuur">Architectuur</option>
                            <option value="Geneeskunde">Geneeskunde</option>
                            <option value="Farmacie">Farmacie</option>
                            <option value="Letteren">Letteren</option>
                            <option value="Economie">Economie</option>
                            <option value="Wijsbegeerte">Wijsbegeerte</option>
                          </select>
                        <label>Campus</label>
                        <select className="select-C" name="campus" onChange={registerChange}>
                          <option value="" selected disabled hidden>Choose here</option>
                          <option value="Aalst">Aalst</option>
                          <option value="Antwerpen">Antwerpen</option>
                          <option value="Brugge">Brugge</option>
                          <option value="Brussel">Brussel</option>
                          <option value="Diepenbeek">Diepenbeek</option>
                          <option value="Geel">Geel</option>
                          <option value="Gent">Gent</option>
                          <option value="Kortrijk">Kortrijk</option>
                          <option value="Leuven">Leuven</option>
                          <option value="Sint-Katelijne-Waver">Sint-Katelijne-Waver</option>
                        </select>
                        <input type="hidden" name="coordinator" value="0" />
                        {isCoordinator && (
                          <label>
                          Coordinator
                          <input
                            type="checkbox"
                            name="coordinator"
                            value="1"
                            onChange={registerChange}
                          /> 
                          </label>
                        )}
                        <label>Password</label>
                        <input
                            type='password'
                            name='password'
                            required='required'
                            placeholder='password'
                            onChange={registerChange}
                        />
                        <input className="btn-login-2" type="submit" value="Register" />
                    </form>
                  <button className="btn-exit" onClick={toggleRegister}><ion-icon name="close-circle-outline"></ion-icon></button>
                </div>
              </div>
            </div>
            </div>
        )}
      </div>
    );
}
export default Navigation;