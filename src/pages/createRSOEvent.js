import '../stylesheets/App.css'
import '../stylesheets/home.css'
import EventsNavbar from '../components/eventsNavBar';
function CreateRSOEvents() { 
return (  
    <div className='container'>
          <EventsNavbar />
    <h1 className='title'>Create an Event</h1> 
    </div>
)
} 
export default CreateRSOEvents;