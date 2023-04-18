import React, { useContext } from 'react';
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";
import UserContext from '../UserContext'; 
import { useNavigate } from 'react-router-dom';

// Navbar creation
const EventsNavbar = () => {  
    const navigate = useNavigate();
    const user = useContext(UserContext);
    console.log(user);
    
    const university_route = {
        pathname: '/MyEvents'
    };
    const user_dict = {
        user_info: user
    } 

    

    return (
        <>
            <Nav> 
                <NavMenu>
                    <NavLink to="/events" activeStyle>
                        Public Events
                    </NavLink> 
                   
                </NavMenu>

                <NavBtn onClick={() => navigate(-1)}>
                    Go Back
     
                </NavBtn>
            </Nav>
        </>
    );
};

export default EventsNavbar