
import React from 'react';
import { NavLink, NavDropdown, DropdownLink } from './NavLinks';

interface DesktopNavProps {
  isActive: (path: string) => boolean;
}

export const DesktopNav = ({ isActive }: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex">
      <NavLink to="/" isActive={isActive('/')}>HOME</NavLink>
      <NavLink to="/about" isActive={isActive('/about')}>ABOUT US</NavLink>
      <NavLink to="/events" isActive={isActive('/events')}>EVENTS</NavLink>
      <NavDropdown label="CAMPUS">
        <DropdownLink to="/campus/tour">Campus Tour</DropdownLink>
        <DropdownLink to="/campus/facilities">Facilities</DropdownLink>
        <DropdownLink to="/campus/history">History</DropdownLink>
      </NavDropdown>
      <NavDropdown label="INTEGRATING">
        <DropdownLink to="/integrating/opportunities">Opportunities</DropdownLink>
        <DropdownLink to="/integrating/mentoring">Mentoring</DropdownLink>
        <DropdownLink to="/integrating/networking">Local Networking</DropdownLink>
      </NavDropdown>
      <NavLink to="/office-barriers" isActive={isActive('/office-barriers')}>OFFICE BARRIERS</NavLink>
      <NavLink to="/mock-interviews" isActive={isActive('/mock-interviews')}>MOCK INTERVIEW</NavLink>
      <NavLink to="/forum" isActive={isActive('/forum')}>DISCUSSION FORUM</NavLink>
      <NavLink to="/chat" isActive={isActive('/chat')}>CHAT</NavLink>
      <NavLink to="/blog" isActive={isActive('/blog')}>BLOGS</NavLink>
    </nav>
  );
};
