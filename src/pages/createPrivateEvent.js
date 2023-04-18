import '../stylesheets/App.css'
import '../stylesheets/home.css'
import EventsNavbar from '../components/eventsNavBar';
function CreatePrivateEvents() { 
return (  
    <div className='container'>
          <EventsNavbar />
    <h1 className='title'>Create a Private Event</h1> 
    </div>
)
} 
export default CreatePrivateEvents;