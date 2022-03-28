import React,{useState} from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
import './MainStyleSheet.css'

const Login = (props) =>{
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
    return(
        <div className="login">
            <div className="box">
            <Link to="/"><button className='btn-escape'><ion-icon name="close-circle-outline"></ion-icon></button></Link>
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
                <div className="box-register">
                    <h2>Register</h2>
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
                        <input className="btn-login" type="submit" value="register" />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;