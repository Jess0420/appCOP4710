
import React, {useEffect, useState} from "react";  
import  Axios  from "axios";
import { useNavigate } from "react-router-dom"; 
import '../stylesheets/register.css' 
import Navbar from "../components/navbar";
let PORT = 8080
function Register() { 
    let navigate = useNavigate()
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");   
    const [email, setEmail] = useState("");  
    const [user_level, setuser_Level] = useState('student');  
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [university, setUniversity] = useState([]);
    const [uniList, setUniList] = useState([]);
    const routeToLogin = () => {
      navigate('/login');
    };
    useEffect(() => {
      async function fetchData() {
        const universitiesData = await getUniversities();
        setUniList(universitiesData);
      }
      fetchData();
    }, []); 

    async function getUniversities() {
      let res = await Axios.get("http://localhost:"+PORT+'/api/universities')
      return res.data
    }

    const RegisterFunc = () => {
      Axios.post('http://localhost:' + PORT + '/api/register', {
        firstname: firstname,
        lastname: lastname,
        email: email,
        user_level: user_level,
        university_id: university,
        username: username, 
        password: password, 
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        console.log("Register Succesful")
        console.log(response);
        if (user_level === 'admin') {
          navigate('/admin', {state: {username: username}});  
        }
        if (user_level === 'student') {
          navigate('/student', {state: {username: username} }); 
        } 
        if(user_level === 'super_admin') {
          navigate('/super')
        }
      }).catch(e => {
        console.log(e);  
        const errorMessage = e.response // assuming the server returns an error message in the "message" field of the response data
      }); 

    }

return (  
    <div className='register'> 
    <Navbar/>
    <h1 className='title'>Account Registration</h1>
    <input required type="text" 
      className="loginField" 
      placeholder="First Name"  
      onChange={(e) => {setFirstname(e.target.value);
      }}
      ></input>
    <input required type="text" 
      className="loginField" 
      placeholder="Last Name"
      onChange={(e) => {setLastname(e.target.value);
      }}
      ></input>
      <input required type="email" 
      className="loginField" 
      placeholder="Email"
      onChange={(e) => {setEmail(e.target.value);
      }}
      ></input>
      <input required type="text" className="loginField" 
      placeholder="Username" 
       onChange={(e) => {setUsername(e.target.value);
       }}></input>
      <input required type="password" className="loginField" 
      placeholder="Password" 
       onChange={(e) => {setPassword(e.target.value);
       }}></input>   
      <p className="text">Choose an account type</p>
        <select name="Account Type" className="loginField"
         onChange={(e) => {setuser_Level(e.target.value);
         }}>
          <option value = "student" >Student</option>
          <option value = "admin" >Admin</option>
          <option value = "super_admin" >Super Admin</option>
        </select>
      <p className="text">Choose your university</p>
      <select name = "Universities" onChange={(e) => {setUniversity(e.target.value)}} className="loginField">
        {uniList.map((uni)=>(
          <option value={uni.university_id} >{uni.name}</option>
        ))}
      </select>
      
      <button className="redirect" onClick={routeToLogin}>Already have an account? Click here to login</button>
      <button type = "submit" className= "registerButton" onClick= {RegisterFunc} >Register</button> 
    </div>
)
} 
export default Register;