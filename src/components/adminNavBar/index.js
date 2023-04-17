import React from 'react';
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

// Navbar creation
const AdminNavbar = () => {

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
                    <NavLink to="/createEvents" activeStyle>
                        Create an Event                        
                    </NavLink> 

                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/login'>Login </NavBtnLink>
                </NavBtn>

            </Nav>
        </>
    );
};

export default AdminNavbar