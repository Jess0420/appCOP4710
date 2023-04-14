import '../stylesheets/App.css'
import '../stylesheets/register.css' 
import { useState } from 'react';
function Register() { 
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");   
return (  
    <div className='register'>
    <h1 className='text'>Account Registration</h1> 
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
      <button className= "loginButton">Login</button> 
    </div>
)
} 
export default Register;