import '../stylesheets/App.css'
import '../stylesheets/home.css'
import EventsNavbar from '../components/eventsNavBar';
import { useState } from 'react'; 
import { useLocation } from 'react-router-dom';
import  Axios  from "axios";  
import { useEffect } from 'react';

const PORT = 8080;

function CreatePrivateEvents() { 

    const [successMessage, setSuccessMessage] = useState('');

    const location = useLocation();  
    console.log(location.state);  
    const user = location.state.user; 

    
    const id = user.user_id  
    const uniID = user.university_id
    console.log(id); 
    console.log(uniID)
 const public_ = 0; 


    const [event_name, setEvent_name] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState(""); 
    const [location_name, setLocation_name] = useState("");
    const [contact_phone, setContact_phone] = useState("");
    const [contact_email, setContact_email] = useState(""); 
  




    const createPrivate = () => {
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
          host_university: uniID,
          headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
          console.log("Event added")
          console.log(response); 
          setSuccessMessage('Event added successfully!');
        }).catch(e => {
          console.log(e);   
          console.log(event_name) 
   


          const errorMessage = e.response // assuming the server returns an error message in the "message" field of the response data
        }); 
  
      } 




return (  
    <div className='container'>
          <EventsNavbar />
    <h1 className='title'>Create a Private Event</h1>   
    <p>{successMessage}</p>
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
        placeholder="yyyy-dd-mm"
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


      <button onClick={createPrivate} className="loginButton">
        Add Event
      </button>

    </div>
)
} 
export default CreatePrivateEvents;