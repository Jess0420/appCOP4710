import logo from './logo.svg'; 
import {BrowserRouter, Route, Routes} from 'react-router-dom'; 
import {react} from 'react';  
import Home from './pages/home';
import Login from './pages/login';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>   
    <Navbar />
    <Routes>
    <Route path='/' element={<Home/>} />  
    <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
