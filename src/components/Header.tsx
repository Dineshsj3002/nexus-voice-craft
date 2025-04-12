
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, UserPlus, ChevronDown, Phone, BookOpen, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import AuthDialog from '@/components/auth/AuthDialog';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  return (
    <header className="bg-white border-b border-gray-200">
      {/* Contact info bar */}
      <div className="bg-yellow-400 py-2 px-4 text-xs md:text-sm text-blue-900 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center"><Phone className="h-3 w-3 mr-1" /> CONTACT: 9600541414</span>
            <span className="flex items-center"><BookOpen className="h-3 w-3 mr-1" /> ADMISSION: +91 98947 01234</span>
            <span className="flex items-center"><Award className="h-3 w-3 mr-1" /> PLACEMENT: +91 98947 90284</span>
          </div>
          <div>
            <span>Email: info@kiot.ac.in</span>
          </div>
        </div>
      </div>
      
      {/* Top header with logo and auth buttons */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/2f632a9a-d04b-476f-ad3d-4ad3ca35b5e5.png" 
              alt="Knowledge Institute of Technology" 
              className="h-16 md:h-20 w-auto object-contain mr-3"
            />
            <div className="hidden md:flex flex-col">
              <span className="text-xl font-display font-semibold text-nexus-primary">Knowledge</span>
              <span className="text-lg font-display">Institute of Technology</span>
              <span className="text-green-600 text-sm font-medium">Alumni Association</span>
            </div>
          </div>
        </Link>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <AuthDialog 
            triggerText="LOGIN" 
            triggerClassName="border-nexus-primary text-nexus-primary hover:bg-nexus-primary hover:text-white"
            defaultTab="login"
          />
          <AuthDialog 
            triggerText="REGISTER" 
            triggerClassName="bg-nexus-primary hover:bg-nexus-primary/90 text-white"
            defaultTab="register"
          />
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-500 hover:text-nexus-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Navigation bar */}
      <div className="bg-nexus-primary text-white">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/about">ABOUT US</NavLink>
            <NavLink to="/events">EVENTS</NavLink>
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
            <NavLink to="/office-barriers">OFFICE BARRIERS</NavLink>
            <NavLink to="/mock-interviews">MOCK INTERVIEW</NavLink>
            <NavLink to="/forum">DISCUSSION FORUM</NavLink>
            <NavLink to="/chat">CHAT</NavLink>
            <NavLink to="/blog">BLOGS</NavLink>
          </nav>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 px-4 animate-fade-in">
              <nav className="flex flex-col space-y-2">
                <MobileNavLink to="/">HOME</MobileNavLink>
                <MobileNavLink to="/about">ABOUT US</MobileNavLink>
                <MobileNavLink to="/events">EVENTS</MobileNavLink>
                <MobileNavLink to="/campus/tour">CAMPUS TOUR</MobileNavLink>
                <MobileNavLink to="/campus/facilities">FACILITIES</MobileNavLink>
                <MobileNavLink to="/campus/history">HISTORY</MobileNavLink>
                <MobileNavLink to="/integrating/opportunities">OPPORTUNITIES</MobileNavLink>
                <MobileNavLink to="/integrating/mentoring">MENTORING</MobileNavLink>
                <MobileNavLink to="/integrating/networking">LOCAL NETWORKING</MobileNavLink>
                <MobileNavLink to="/office-barriers">OFFICE BARRIERS</MobileNavLink>
                <MobileNavLink to="/mock-interviews">MOCK INTERVIEW</MobileNavLink>
                <MobileNavLink to="/forum">DISCUSSION FORUM</MobileNavLink>
                <MobileNavLink to="/chat">CHAT</MobileNavLink>
                <MobileNavLink to="/blog">BLOGS</MobileNavLink>
                
                <div className="pt-4 flex flex-col space-y-3">
                  <AuthDialog 
                    triggerText="LOGIN" 
                    triggerClassName="border-white text-white w-full"
                    defaultTab="login"
                  />
                  <AuthDialog 
                    triggerText="REGISTER" 
                    triggerClassName="bg-white text-nexus-primary hover:bg-gray-100 w-full"
                    defaultTab="register"
                  />
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to}
    className="text-white font-medium px-4 py-3 hover:bg-blue-800 transition-colors inline-block"
  >
    {children}
  </Link>
);

const NavDropdown = ({ label, children }: { label: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button 
        className="text-white font-medium px-4 py-3 hover:bg-blue-800 transition-colors flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <ChevronDown className="h-4 w-4 ml-1" />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 top-full bg-white text-gray-800 shadow-md rounded-b-md min-w-48 z-10">
          <div className="py-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to}
    className="block px-4 py-2 hover:bg-gray-100 transition-colors text-sm"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to}
    className="text-white font-medium py-2 block"
  >
    {children}
  </Link>
);

export default Header;
