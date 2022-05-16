import jwt_decode from "jwt-decode"
import axios from 'axios'

function authHeader(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.token){
        return `Bearer ` + user.token;
    } else {
        return null;
    } 
} 

function getRole(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.token){
        var decodedToken = jwt_decode(user.token);
        return decodedToken.role;
    } else {
        return "";
    } 
} 

function getUserId(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.token){
        var decodedToken = jwt_decode(user.token);
        return decodedToken.sub;
    } else {
        return "";
    } 
} 
function getCoordinator(){
    const coordinator = ''
    const coordinatorApi = axios.create({
        baseURL:`https://localhost:8080/professor/`,
        headers: {
          'Authorization': ''+authHeader(),
          'Content-Type': 'application/json'
        }
      })     
    coordinatorApi.put('/iscoordinator',{
        userId:getUserId()
    }).then(function(response){
        localStorage.setItem("coordinator",response.data)
    })
}
export {authHeader, getRole, getUserId, getCoordinator}

function refreshToken() {

}

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && err.response.data.message === "JWT token expired " && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await refreshToken();
                    const { accessToken } = rs.data;
                    window.localStorage.setItem("accessToken", accessToken);
                    axios.defaults.headers.common["x-access-token"] = accessToken;
                    return axios(originalConfig);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }
                    return Promise.reject(_error);
                }
            }
            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }
        return Promise.reject(err);
    }
);