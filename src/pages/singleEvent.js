import '../stylesheets/App.css'
import '../stylesheets/home.css'
import Navbar from '../components/navbar'; 
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'; 
import { Axios } from 'axios'; 
import { useState } from 'react';

const PORT = 8080; 

function SingleEvents() {   
    const location = useLocation();
    const event = location.state?.eventId 
    const [events, setEvents] = useState([]);  
    const id = event.eventId

    const navigate = useNavigate(); 
    useEffect(() => { 
        Axios.get('http://localhost:' + PORT + '/api/userevents/:id', {
            event_id: id, 
        }).then(response => {
            setEvents(response.data);  
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

return (  
    <div className='container'>
    <Navbar/>
 
  <div className="post-container">
 
    {events.map(event => (
      <div className="post" key={event.id}>
        <div className="post-header">
        <button className='titleButton'>{event.name}</button>

          <p>{event.date}</p>
        </div>
        <div className="post-body">
          <h3>{event.location_name}</h3>
          <p>{event.description}</p> 
          
        </div>
      </div>
    ))}
  </div>  
  </div>
);
} 
export default SingleEvents;