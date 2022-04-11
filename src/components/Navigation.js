import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import './Navigation.css'

function Navigation() {
  const [modal, setModal] = useState(false);

  const toggleLogin = () =>{
    setModal(!modal)
  }
  const [editFormData, setEditFormData] = useState({
    email: '',
    password: ''
});
const handleEditChange = (event) =>{
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newFormData = {...editFormData};
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
};
  return (
    
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark">  
          <div className="container">
            <img className='kuleuven-logo' src={require('./images/kuleuven-logo.png')} alt='kuleuven logo' />
            <h4 className='mpt'>Thesis Platform</h4>
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
            <button onClick={toggleLogin} className="btn-login">Login</button>
          </div>
      </nav>
      {modal && (
      <div className="div-login">
              <div onClick={toggleLogin} className="div-overlay">
                <div className="login-content">
                <div className="box-login">
                    <h2>Login</h2>
                    <form className="form-login">
                        <label>Email</label>
                        <input
                            type='email'
                            name='mail'
                            required='required'
                            placeholder='email'
                            onChange={handleEditChange}
                            size="40" 
                        />
                        <label>Password</label>
                        <input
                            type='password'
                            name='password'
                            required='required'
                            placeholder='password'
                            onChange={handleEditChange}
                            size="40" 
                        />
                        <input className="btn-login" type="submit" value="login" />
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