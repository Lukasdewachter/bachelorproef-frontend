import React, {useState} from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {authHeader,getRole,getCoordinator} from "./auth";
import '../components/MainStyleSheet.css'

const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
    }
});
function Navigation() {
  const [modal, setModal] = useState(false)
  const loggedIn = authHeader();
  const toggleLogin = () =>{
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
    api.post(`https://localhost:8080/authenticate`,{
      username: login.username,
      password: login.password
    })
    .then(function (response) {
      event.preventDefault();
      localStorage.setItem("user", JSON.stringify(response.data))
      getCoordinator();
      setModal(false);
      window.location.reload();
  })
    .catch(function (error) {
      console.log(error);
      });
    };
  const [userInfo, setUserInfo] = useState(false);
  const userInformation = () =>{
    setUserInfo(!userInfo)
  }
  const logout = () =>{
    localStorage.removeItem('coordinator')
    localStorage.removeItem('user');
    window.open("/", "_self");
  }
const [registerRole, setRegisterRole] = useState({
  role:''
})
const [isCompany ,setIsCompany] = useState(false);
const [isCoordinator, setIsCoordinator] = useState(false);
const roleChange=(event)=>{
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    if(fieldValue === "professor"){
      setIsCoordinator(true)
    }else{setIsCoordinator(false)}
    if(fieldValue === "company"){
      setIsCompany(true)
    }else{setIsCompany(false)}
    const newFormData = {...registerRole};
    newFormData[fieldName] = fieldValue;
    setRegisterRole(newFormData);
    
}
const registerService =()=>{
  api.post(`https://localhost:8080/`+registerRole.role+"/add", {
    firstName: addData.firstName,
    lastName: addData.lastName,
    address: addData.address,
    tel: addData.tel,
    mail: addData.mail,
    fieldOfStudy: addData.fieldOfStudy,
    campus: addData.campus,
    password: addData.password,
    coordinator: addData.coordinator,
    companyName: addData.companyName
  }).then(function(response){
  })
  .catch(function(error){
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
  coordinator:'',
  companyName:''
});
const registerChange = (event) =>{
  event.preventDefault();
  const fieldName = event.target.getAttribute('name');
  const fieldValue = event.target.value;
  const newData = {...addData};
  newData[fieldName] = fieldValue;
  setAddData(newData);
};
const [checked, setChecked] = useState(false);
const handleCheckbox =()=>{
  setChecked(!checked);
}
const coordinator = localStorage.getItem('coordinator')
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark fixed-top">  
          <div className="container">
            <img className='kuleuven-logo' src={require('./images/kuleuven-logo.png')} alt='kuleuven logo' />
            <h4 className='mpt'>Thesis Platform</h4>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Theses
                  </NavLink>
                </li>
                {getRole()==="Student" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Bookmarks">
                    Bookmarks
                    </NavLink>
                  </li>
                )}
                {getRole()==="Admin" && (
                  <li className="nav-item">
                  <NavLink className="nav-link" to="/Students">
                   Students
                  </NavLink>
                </li>
                )}
                {getRole()==="Professor" && (
                  <li className="nav-item">
                  <NavLink className="nav-link" to="/Students">
                  Students
                  </NavLink>
                </li>
                )}
                {getRole()==="Admin" && (
                  <li className="nav-item">
                  <NavLink className="nav-link" to="/Professors">
                    Professors
                  </NavLink>
                </li>
                  )}
                  {getRole()==="Admin" && (
                    <li className="nav-item">
                  <NavLink className="nav-link" to="/Companies">
                    Companies
                  </NavLink>
                </li>
                  )}
                {coordinator==="true" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Approve-Thesis">
                    Approve page
                  </NavLink>
                </li>)}
                {coordinator==="true" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Assign-Thesis">
                    Assign Student
                  </NavLink>
                </li>)}
              </ul>
            </div>
            {loggedIn==null && (
              <button onClick={toggleLogin} className="btn-login">Login</button>)}
            {loggedIn !=null && (
              <button onClick={userInformation} className="btn-user"><ion-icon title={false} name="person-outline"></ion-icon></button>)}
          </div>
      </nav>
      {userInfo &&(
        <div className ='userInfo'>
            <ul>
              <h2>User Info</h2>
            </ul>
            <ul>Role: {getRole()}</ul>
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
                        
                        <input
                            type='email'
                            name='username'
                            required='required'
                            placeholder='email'
                            onChange={loginChange}
                        />
                        
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
                    <select name="role" onChange={roleChange} className="select-R">
                      <option value="" selected disabled hidden>Choose here</option>
                      <option value="student">Student</option>
                      <option value="professor">Professor</option>
                      <option value="company">Company</option>
                    </select>
                    <form onSubmit={registerService} className="form-login">
                        
                        <input
                        className="input-register"
                          type="text"
                          name="firstName"
                          required="required"
                          placeholder="first name"
                          onChange={registerChange}
                        />
                        
                        <input
                        className="input-register"
                          type="text"
                          name="lastName"
                          required="required"
                          placeholder="last name"
                          onChange={registerChange}
                        />
                        
                        <input
                        className="input-register"
                            type='email'
                            name='mail'
                            required='required'
                            placeholder='email'
                            onChange={registerChange}
                        />
                       
                        <input
                        className="input-register"
                          type="text"
                          name="tel"
                          required="required"
                          placeholder="tel nr"
                          onChange={registerChange}
                        />
                        
                        <input
                        className="input-register"
                          type="text"
                          name="address"
                          required="required"
                          placeholder="adress"
                          onChange={registerChange}
                        />
                       
                        <select className="select-FOS" name="fieldOfStudy" onChange={registerChange} >
                            <option value="" selected disabled hidden>Choose Field of Study</option>
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
                        
                        <select className="select-C" name="campus" onChange={registerChange}>
                          <option value="" selected disabled hidden>Choose campus</option>
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
                        {isCompany && (
                          
                            <input
                            className="input-register"
                              type="text"
                              name="companyName"
                              required="required"
                              placeholder="company name"
                              onChange={registerChange}
                            />
                        
                        )}
                        {isCoordinator && (
                          <label>
                          Coordinator
                          <input
                          className="input-register"
                            type="checkbox"
                            name="coordinator"
                            value="1"
                            checked={checked}
                            onChange={handleCheckbox}
                          /> 
                          </label>
                        )}
                        
                        <input
                        className="input-register"
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