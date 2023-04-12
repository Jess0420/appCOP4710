import logo from './logo.svg'; 
import {BrowserRouter, Route, Routes} from 'react-router-dom'; 
import {react} from 'react';  
import Home from './pages/home';
import Login from './pages/login'; 
import Register from './pages/register';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>   
    <Navbar />
    <Routes>
    <Route path='/' element={<Home/>} />  
    <Route path='/login' element={<Login/>}/> 
    <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
