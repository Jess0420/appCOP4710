import logo from './logo.svg'; 
import {BrowserRouter, Route, Routes} from 'react-router-dom'; 
import {react} from 'react';  
import Home from './pages/home';
import Login from './pages/login'; 
import Register from './pages/register';
import Navbar from './components/navbar'; 
import Students from './pages/student';
import Admin from './pages/admin'; 
import SuperAdmin from './pages/superadmin'; 
import Events from './pages/events'; 
import RSOEvents from './pages/rsoEvents';
import UniversityEvents from './pages/universityEvents';

function App() {
  return (
    <BrowserRouter>   
    <Routes>
    <Route path='/' element={<Home/>} />  
    <Route path='/login' element={<Login/>}/> 
    <Route path='/register' element={<Register/>}/> 
    <Route path='/student' element={<Students/>}/> 
    <Route path='/admin' element={<Admin/>} /> 
    <Route path='/super' element={<SuperAdmin/>}/> 
    <Route path='/events' element={<Events/>}/> 
    <Route path='/rsoEvents' element={<RSOEvents/>}/> 
    <Route path='/universityEvents' element={<UniversityEvents/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
