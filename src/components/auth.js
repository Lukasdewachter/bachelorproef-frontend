export default function authHeader(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.token){
        console.log('token aanwezig')
        return user.token;
    } else {
        console.log('token afwezig')
        return {};
    } 
} 