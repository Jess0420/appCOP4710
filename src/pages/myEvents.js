import '../stylesheets/App.css'
import '../stylesheets/home.css' 
import '../stylesheets/posts.css'
import EventsNavbar from '../components/eventsNavBar';
import { useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom'; 
import Axios from 'axios';
import { useEffect } from 'react'; 
import '../stylesheets/events.css'  
import Navbar from '../components/navbar';


const PORT = 8080;

function MyEvents() {   
    const location = useLocation();
    const user = location.state?.user_info
    console.log(user)
    const id = user.user_info   
    const [events, setEvents] = useState([]);    
    

  

    
  let navigate = useNavigate();

  const routeToSingleEvent = (eventId) => {
    navigate("/singleEvent", { state: { eventId } });
  };


    useEffect(() => { 
        Axios.get('http://localhost:' + PORT + '/api/userevents/:id', {
            user_id: id, 
        }).then(response => {
            setEvents(response.data);  
            console.log(response.data) 
            console.log(response.data.event_id)
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
            <button className='titleButton' onClick={() => routeToSingleEvent(event.id)}>{event.name}</button>

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
export default MyEvents;