import React from 'react';
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

// Navbar creation
const StudentNavbar = () => {

    return (
        <>
            <Nav>
                
                <NavMenu>
                    <NavLink to="/events" activeStyle>
                        Public Events
                    </NavLink> 
                    <NavLink to="/universityEvents" activeStyle>
                        University Events                        
                    </NavLink> 
                    <NavLink to="/rsoEvents" activeStyle>
                        Your Organization Events                        
                    </NavLink> 

                </NavMenu>
           
            </Nav>
        </>
    );
};

export default StudentNavbar