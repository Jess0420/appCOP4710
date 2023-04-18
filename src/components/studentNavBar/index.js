import React, { useContext } from 'react';
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";
import UserContext from '../UserContext';

// Navbar creation
const StudentNavbar = () => { 
    const user = useContext(UserContext);
    console.log(user);
    
    const university_route = {
        pathname: '/universityEvents'
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
                    <NavLink to={ university_route } state={user_dict} activeClassName="active">
                        MyEvents
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default StudentNavbar