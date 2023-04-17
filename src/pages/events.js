import '../stylesheets/App.css'
import '../stylesheets/home.css'
import Navbar from '../components/navbar'; 
import  Axios  from 'axios';
import { useState } from 'react'; 
import { useEffect } from 'react';

const PORT = 8080;

function Events() {  

const [events, setEvents] = useState([]);  

useEffect(() => { 
    Axios.get('http://localhost:' + PORT + '/api/publicevents')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



return (  
    <div>
      {events.map(event => (
        <div key={event.id}>
          <h2>{event.title}</h2> 
          <h2>{event.location_name}</h2>
          <p>{event.description}</p>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
}
export default Events;