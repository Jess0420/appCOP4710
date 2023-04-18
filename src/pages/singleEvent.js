import '../stylesheets/App.css'
import '../stylesheets/home.css'
import Navbar from '../components/navbar'; 
import { useNavigate } from 'react-router-dom';
function SingleEvents() {  
    const navigate = useNavigate();
return (  
    <div className='home'>
          <Navbar />
    <h1 className='text'>Public Events</h1>  
    <button onClick={() => navigate(-1)}>
          Back
        </button>
    </div>
)
} 
export default SingleEvents;