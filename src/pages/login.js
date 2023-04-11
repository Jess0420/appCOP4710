import React, {useState} from "react"; 
import '../stylesheets/login.css' 
function Login() {  
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");  
    return ( 
        <div className='container'>
        <h1 className="text">Welcome Back! Login Here!</h1> 
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
      <button className= "login">Login</button>
    
        </div>
    )
    

    } 
    export default Login; 