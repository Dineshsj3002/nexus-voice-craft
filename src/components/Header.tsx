
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  UserPlus, 
  ChevronDown, 
  Phone, 
  BookOpen, 
  Award, 
  User, 
  LogOut, 
  Settings, 
  UserCircle, 
  Bell,
  Home,
  Calendar,
  MessageSquare,
  Briefcase,
  Users,
  FileText,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import AuthDialog, { useAuth } from '@/components/auth/AuthDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated, logout } = useAuth();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  // Check if the current route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  React.useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);
  
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
        
        {/* Auth Buttons or User Profile */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[
                    { 
                      title: "New mentor connection", 
                      description: "Dr. Anand Sharma accepted your request", 
                      time: "2 hours ago",
                      icon: UserPlus,
                      iconClass: "text-green-500"
                    },
                    { 
                      title: "Upcoming mock interview", 
                      description: "Tomorrow at 3:00 PM with Sarah Johnson", 
                      time: "1 day ago",
                      icon: Calendar,
                      iconClass: "text-blue-500"
                    },
                    { 
                      title: "New forum reply", 
                      description: "Someone replied to your post about career advice", 
                      time: "2 days ago",
                      icon: MessageSquare,
                      iconClass: "text-purple-500"
                    }
                  ].map((notification, index) => (
                    <DropdownMenuItem key={index} className="flex items-start py-3 px-4 cursor-pointer">
                      <div className={`rounded-full p-2 ${notification.iconClass} bg-gray-100 mr-3`}>
                        <notification.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-xs text-gray-500">{notification.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center text-nexus-primary font-medium">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 rounded-full flex items-center gap-2 pl-2 pr-3">
                    <Avatar className="h-8 w-8">
                      {user.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback className="bg-nexus-primary text-white">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="font-medium text-sm hidden md:inline">{user.name.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/alumni')}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/mentorship')}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Mentorship</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/alumni/privacy-settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <AuthDialog 
                triggerText="LOGIN" 
                triggerClassName="border border-nexus-primary text-nexus-primary hover:bg-nexus-primary hover:text-white transition-colors"
                defaultTab="login"
              />
              <AuthDialog 
                triggerText="JOIN AS ALUMNI" 
                triggerClassName="bg-nexus-primary hover:bg-nexus-primary/90 text-white transition-colors"
                defaultTab="register"
              />
            </>
          )}
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
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 px-4 animate-fade-in">
              <nav className="flex flex-col space-y-2">
                {isAuthenticated && user && (
                  <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-blue-800">
                    <Avatar className="h-10 w-10">
                      {user.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback className="bg-white text-nexus-primary text-sm">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-white/70 text-xs">{user.email}</p>
                    </div>
                  </div>
                )}
                
                <MobileNavLink to="/" isActive={isActive('/')}>HOME</MobileNavLink>
                {isAuthenticated && <MobileNavLink to="/dashboard" isActive={isActive('/dashboard')}>DASHBOARD</MobileNavLink>}
                <MobileNavLink to="/about" isActive={isActive('/about')}>ABOUT US</MobileNavLink>
                <MobileNavLink to="/events" isActive={isActive('/events')}>EVENTS</MobileNavLink>
                <MobileNavLink to="/mentorship" isActive={isActive('/mentorship')}>MENTORSHIP</MobileNavLink>
                <MobileNavLink to="/campus/tour" isActive={isActive('/campus/tour')}>CAMPUS TOUR</MobileNavLink>
                <MobileNavLink to="/campus/facilities" isActive={isActive('/campus/facilities')}>FACILITIES</MobileNavLink>
                <MobileNavLink to="/campus/history" isActive={isActive('/campus/history')}>HISTORY</MobileNavLink>
                <MobileNavLink to="/integrating/opportunities" isActive={isActive('/integrating/opportunities')}>OPPORTUNITIES</MobileNavLink>
                <MobileNavLink to="/integrating/mentoring" isActive={isActive('/integrating/mentoring')}>MENTORING</MobileNavLink>
                <MobileNavLink to="/integrating/networking" isActive={isActive('/integrating/networking')}>LOCAL NETWORKING</MobileNavLink>
                <MobileNavLink to="/office-barriers" isActive={isActive('/office-barriers')}>OFFICE BARRIERS</MobileNavLink>
                <MobileNavLink to="/mock-interviews" isActive={isActive('/mock-interviews')}>MOCK INTERVIEW</MobileNavLink>
                <MobileNavLink to="/forum" isActive={isActive('/forum')}>DISCUSSION FORUM</MobileNavLink>
                <MobileNavLink to="/chat" isActive={isActive('/chat')}>CHAT</MobileNavLink>
                <MobileNavLink to="/blog" isActive={isActive('/blog')}>BLOGS</MobileNavLink>
                
                <div className="pt-4 flex flex-col space-y-3">
                  {isAuthenticated && user ? (
                    <>
                      <Button
                        onClick={() => navigate('/alumni')}
                        variant="outline"
                        className="border-white text-white w-full justify-start"
                      >
                        <UserCircle className="mr-2 h-4 w-4" />
                        My Profile
                      </Button>
                      <Button
                        onClick={() => navigate('/alumni/privacy-settings')}
                        variant="outline"
                        className="border-white text-white w-full justify-start"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="border-white text-white w-full justify-start"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <AuthDialog 
                        triggerText="LOGIN" 
                        triggerClassName="border-white text-white w-full hover:bg-white hover:text-nexus-primary"
                        defaultTab="login"
                      />
                      <AuthDialog 
                        triggerText="JOIN AS ALUMNI" 
                        triggerClassName="bg-white text-nexus-primary hover:bg-gray-100 w-full"
                        defaultTab="register"
                      />
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, children, isActive = false }: { to: string; children: React.ReactNode; isActive?: boolean }) => (
  <Link 
    to={to}
    className={cn(
      "text-white font-medium px-4 py-3 hover:bg-blue-800 transition-colors inline-block",
      isActive && "bg-blue-800"
    )}
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

const MobileNavLink = ({ to, children, isActive = false }: { to: string; children: React.ReactNode; isActive?: boolean }) => (
  <Link 
    to={to}
    className={cn(
      "text-white font-medium py-2 block",
      isActive && "text-yellow-300"
    )}
  >
    {children}
  </Link>
);

export default Header;
