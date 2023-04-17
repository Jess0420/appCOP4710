import React, {useState} from "react";  
import  Axios  from "axios";
import { useNavigate } from "react-router-dom"; 
import '../stylesheets/login.css' 
const PORT = 8080;

function Login() {  
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");     
    const [user_level, setuser_Level] = useState(""); 
    const [isLoggedIn, setLoggedIn] = useState(""); 

    let navigate = useNavigate()

    const routeToRegister = () => {
      navigate('/register');
    };  

    let data = JSON.stringify({
      username: username, 
      password: password,  
      user_level: user_level, 
      
    }) 

    const loginAuth = () => {
      Axios.post('http://localhost:' + PORT + '/api/login', {
        username: username, 
        password: password, 
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        console.log("Log in Succesful")
        console.log("Role", response.data.user_level); 
        setuser_Level(response.data.user_level) 
        console.log("Role is", user_level)
      }).catch(e => {
        console.log(e);  
        const errorMessage = e.response // assuming the server returns an error message in the "message" field of the response data
      }); 

      if (user_level == 'admin') {
        navigate('/admin', {state: {username: username}});  
      }
      if (user_level == 'student') {
        navigate('/student', {state: {username: username} }); 
      } 
      if(user_level == 'super_admin') {
        navigate('/super')
      }
    }



    return ( 
        <div className='container'>
        <h1 className="text">Account Login!</h1> 
        <input type="text" 
      className="loginField" 
      placeholder="User Name"
      onChange={(e) => {setUsername(e.target.value);
      }}
      ></input>
      <input type="password" className="loginField" 
      placeholder="Password" 
       onChange={(e) => {setPassword(e.target.value);
       }}></input>
      <button onClick={loginAuth} className= "loginButton">Login</button> 
      <button className="registerButton" onClick={routeToRegister}>New here? Click here to register</button>
    
        </div>
    )
    

    } 
    export default Login; 