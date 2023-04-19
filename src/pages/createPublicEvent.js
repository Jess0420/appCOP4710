import '../stylesheets/App.css'
import '../stylesheets/home.css'  
import  Axios  from "axios";
import { useState } from 'react';
import EventsNavbar from '../components/eventsNavBar'; 
import UserContext from '../components/UserContext';
import { useLocation } from 'react-router-dom'; 
import Navbar from '../components/navbar'; 

import { useNavigate } from 'react-router-dom';

const PORT = 8080;

function CreatePublicEvents() {  

    let navigate = useNavigate();

    
    const location = useLocation();  
    console.log(location.state);  
    const user = location.state.user; 

    
    const id = user.user_id 
    console.log(id);
 const public_ = 1; 


    const [event_name, setEvent_name] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState(""); 
    const [location_name, setLocation_name] = useState("");
    const [contact_phone, setContact_phone] = useState("");
    const [contact_email, setContact_email] = useState(""); 
 

    const createPublic = () => {
        Axios.post('http://localhost:' + PORT + '/api/createevent', {
         user_id: id,
          event_name: event_name,
          category: category,
          description: description,
          date: date,
          time: time,
          location_name: location_name, 
          contact_phone: contact_phone,
          contact_email: contact_email, 
          is_public: public_,
        }).then((response) => {
          console.log("Event added")
          console.log(response); 
          
        }).catch(e => {
          console.log(e);  
          const errorMessage = e.response // assuming the server returns an error message in the "message" field of the response data
        });  

        navigate("/myEvents", {state: {user_info: user}})
  
      }

return (  
    <div className='container'>
          <EventsNavbar />
    <h1 className='title'>Create a Public Event</h1>  
    <input
        type="text"
        className="loginField"
        placeholder="Event Name"
        onChange={(e) => {
          setEvent_name(e.target.value);
        }}
      >

      </input>
      <input
        type="text"
        className="loginField"
        placeholder="Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        </input> 
         <input
        type="text"
        className="loginField"
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      > 
      </input>
         <input
        type="text"
        className="loginField"
        placeholder="Time"
        onChange={(e) => {
          setTime(e.target.value);
        }}
      >

      </input>
         <input
        type="text"
        className="loginField"
        placeholder="YYYY-MM-DD"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      >

      </input>
         <input
        type="text"
        className="loginField"
        placeholder="Location Name"
        onChange={(e) => {
          setLocation_name(e.target.value);
        }}
      >
   </input>
         <input
        type="text"
        className="loginField"
        placeholder="Contact Phone"
        onChange={(e) => {
          setContact_phone(e.target.value);
        }}
      >

      </input>
         <input
        type="text"
        className="loginField"
        placeholder="Contact Email"
        onChange={(e) => {
          setContact_email(e.target.value);
        }}
      >


      </input>
      <button onClick={createPublic} className="loginButton">
        Add Event
      </button>

    </div>
)
} 
export default CreatePublicEvents;