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
                    <NavLink to="/events" activeStyle>
                        University Events                        
                    </NavLink> 

                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/login'>Login </NavBtnLink>
                </NavBtn>

            </Nav>
        </>
    );
};

export default StudentNavbar