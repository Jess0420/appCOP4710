import '../stylesheets/App.css'
import '../stylesheets/home.css'  
import { useLocation } from 'react-router-dom';
import AdminNavbar from '../components/adminNavBar'; 

function Admin() {  
    const location = useLocation(); 
    const username = location.state?.username; 
return (   
    <div> 
        <AdminNavbar/>
    <h1 className='text'>Welcome, {username} </h1> 
    </div>
)
} 
export default Admin;