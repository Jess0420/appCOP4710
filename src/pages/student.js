import '../stylesheets/App.css'
import '../stylesheets/home.css' 
import StudentNavbar from '../components/studentNavBar';  
import UserContext from '../components/UserContext';
import { useLocation } from 'react-router-dom';

function Students() {  
    const location = useLocation();  
    console.log(location.state);
    const user = location.state.user; 

return (    
    <UserContext.Provider value={user}>
    <div className='container'> 
        <StudentNavbar user={user}/>
    <h1 className='title'>Welcome, {user.firstname}!</h1>  
    <h2 className='title'>Click on the MyEvents tab to see all of your events</h2>
   
    </div> 
    </UserContext.Provider>
)
} 
export default Students;