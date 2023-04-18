import '../stylesheets/App.css'
import '../stylesheets/home.css'  
import { useLocation } from 'react-router-dom';
import AdminNavbar from '../components/adminNavBar';  
import UserContext from '../components/UserContext';

function Admin() {  
    const location = useLocation();  
    console.log(location.state);
    const user = location.state.user; 

return (    
    <UserContext.Provider value={user}>
    <div className='container'> 
        <AdminNavbar user={user}/>
    <h1 className='title'>Welcome, {user.firstname}!</h1>  
    <h2 className='title'>Click on the MyEvents tab to see all of your events</h2> 
    <h2 className='title'>Click on the Create Events tab to create a new event</h2>
   
    </div> 
    </UserContext.Provider>
)
} 
export default Admin;