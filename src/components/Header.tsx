
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, UserPlus, Compass, MessageSquare, Award, Calendar, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  
  const handleSignIn = () => {
    // For now, just show an alert since sign-in functionality isn't implemented
    alert("Sign in functionality will be coming soon!");
  };
  
  const handleJoinNow = () => {
    // For now, just show an alert since join functionality isn't implemented
    alert("Join now functionality will be coming soon!");
  };
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-nexus-primary text-white flex items-center justify-center font-display text-xl">a</div>
          <span className="text-xl font-display font-semibold">alumNexus</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/mentorship">Mentorship</NavLink>
          <NavLink to="/mock-interviews">Mock Interviews</NavLink>
          <NavLink to="/hubs">Subject Hubs</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/resources">Resources</NavLink>
        </nav>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button 
            variant="outline" 
            className="border-nexus-primary text-nexus-primary hover:bg-nexus-primary hover:text-white"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
          <Button 
            className="bg-nexus-primary hover:bg-nexus-primary/90 text-white"
            onClick={handleJoinNow}
          >
            Join now
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-500 hover:text-nexus-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 px-4 pb-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink to="/mentorship" icon={<UserPlus className="h-5 w-5 mr-2" />}>Mentorship</MobileNavLink>
            <MobileNavLink to="/mock-interviews" icon={<MessageSquare className="h-5 w-5 mr-2" />}>Mock Interviews</MobileNavLink>
            <MobileNavLink to="/hubs" icon={<Compass className="h-5 w-5 mr-2" />}>Subject Hubs</MobileNavLink>
            <MobileNavLink to="/events" icon={<Calendar className="h-5 w-5 mr-2" />}>Events</MobileNavLink>
            <MobileNavLink to="/resources" icon={<Award className="h-5 w-5 mr-2" />}>Resources</MobileNavLink>
            
            <div className="pt-4 flex flex-col space-y-3">
              <Button 
                variant="outline" 
                className="border-nexus-primary text-nexus-primary w-full"
                onClick={handleSignIn}
              >
                Sign in
              </Button>
              <Button 
                className="bg-nexus-primary hover:bg-nexus-primary/90 text-white w-full"
                onClick={handleJoinNow}
              >
                Join now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to}
    className="text-gray-700 hover:text-nexus-primary font-medium story-link"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, icon }: { to: string; children: React.ReactNode; icon?: React.ReactNode }) => (
  <Link 
    to={to}
    className="flex items-center text-gray-700 hover:text-nexus-primary font-medium py-2"
  >
    {icon}
    {children}
  </Link>
);

export default Header;
