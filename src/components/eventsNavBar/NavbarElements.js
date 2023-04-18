import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: black;
    height: 75px; 
    display: flex;
    justify-content: space-between;
    align-items: left;
    padding: 20px;
    z-index: 12; 
    width:auto ;
`;
export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
  text-decoration: none; 

`;

export const NavLink = styled(Link)`
color: white;
display: flex;
align-items: center;
text-decoration: none;
padding: 20px;
height: 100%;  

cursor: pointer;
&:hover {
  color: gold;
}
`;

export const Bars = styled(FaBars)`
  display: flex;
  color: white; 
  
  @media screen and (max-width: 768px) {
    display: block; 
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;  

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px; 
  color: white;   
  font-size: 34px;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: gold; 
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 10px;
  background: white;
  padding: 10px 22px;
  color: black;
  outline: none;
  border: 2px solid #1f2833;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px; 
  width: max-content ;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: gold;
    color: balck;
  }
`;