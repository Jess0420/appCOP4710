import '../stylesheets/App.css'
import '../stylesheets/home.css'  
import { useLocation } from 'react-router-dom';
import AdminNavbar from '../components/adminNavBar';  
import UserContext from '../components/UserContext'; 
import { useNavigate } from 'react-router-dom'; 
import Fade from 'react-reveal/Fade'; 
import { useState } from 'react';

function Admin() {  
    const location = useLocation();  
    console.log(location.state);
    const user = location.state.user;   
    
      const [openMenu1, setOpenMenu1] = useState(false); 
      const toggleMenu1 = () => {
          setOpenMenu1(!openMenu1);
        }

    
  let navigate = useNavigate();


  const routeToCreatePublicEvents = () => {
    navigate("/createPublicEvent", {state: { user: user } } );
  }; 

  const routeToCreatePrivateEvents = () => {
    navigate("/createPrivateEvent");
  }; 

  const routeToCreateRSOEvents = () => {
    navigate("/createRSOEvent");
  }; 


return (    
    <UserContext.Provider value={user}>
    <div className='container'> 
        <AdminNavbar user={user}/>
    <h1 className='title'>Welcome, {user.firstname}!</h1>   


          
    <button className='mainButtons' onClick={toggleMenu1}>Create an Event</button>
          {openMenu1 ? (
            <div className="started-container">
              <Fade bottom> 
              <div className="flex-container">
              <Fade top>
                <button onClick={routeToCreatePublicEvents} className='submainButtons'>
                  Create a public event
                </button>
                <button onClick={routeToCreatePrivateEvents} className='submainButtons'>
                  Create a private event
                </button> 
                <button onClick={routeToCreateRSOEvents} className='submainButtons'>
                  Create a RSO event
                </button>
              </Fade>

            </div>
             
              </Fade>

            </div>

          ) : null} 
    


    
   
    </div> 
    </UserContext.Provider>
)
} 
export default Admin;