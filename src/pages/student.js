import '../stylesheets/App.css'
import '../stylesheets/home.css' 
import StudentNavbar from '../components/studentNavBar'; 
import { useLocation } from 'react-router-dom';

function Students() {  
    const location = useLocation(); 
    const username = location.state?.username; 

return (   
    <div> 
        <StudentNavbar/>
    <h1 className='text'>Welcome, {username}!</h1>  
    <h2>Here are your RSO Events</h2>
    </div>
)
} 
export default Students;