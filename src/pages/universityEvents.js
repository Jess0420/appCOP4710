import '../stylesheets/App.css'
import '../stylesheets/home.css' 
import '../stylesheets/posts.css'
import Navbar from '../components/navbar'; 
import { useState } from 'react'; 
import { useLocation } from 'react-router-dom'; 
import Axios from 'axios';
import { useEffect } from 'react';

const PORT = 8080;

function UniversityEvents() {   
    const location = useLocation();
    const user = location.state?.user_info

    const [events, setEvents] = useState([]);    
    const id = user.user_id
    useEffect(() => { 
        Axios.get('http://localhost:' + PORT + '/api/userevents/:id', {
            user_id: id, 
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
      <h1 className='title'> {user.firstname}'s Events</h1>
      <div className="post-container">
     
        {events.map(event => (
          <div className="post" key={event.id}>
            <div className="post-header">
              <h2>{event.name}</h2> 
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
export default UniversityEvents;