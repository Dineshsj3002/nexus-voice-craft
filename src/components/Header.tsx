import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Bell, User } from 'lucide-react';
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
import { DesktopNav } from './navigation/DesktopNav';
import { MobileNav } from './navigation/MobileNav';
import { Calendar, MessageSquare, UserPlus } from 'lucide-react';

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

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="bg-yellow-400 py-2 px-4 text-xs md:text-sm text-blue-900 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center">ALUMNI ADMIN: +91 98947 01234</span>
          </div>
          <div>
            <span>Email: info@kiot.ac.in</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
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
        
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
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
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/alumni')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <AuthDialog 
                triggerText="JOIN AS STUDENT" 
                triggerClassName="bg-nexus-primary hover:bg-nexus-primary/90 text-white transition-colors"
                defaultTab="register"
              />
              <AuthDialog 
                triggerText="JOIN AS ALUMNI" 
                triggerClassName="bg-yellow-400 hover:bg-yellow-500 text-blue-900 transition-colors"
                defaultTab="register"
              />
              <AuthDialog 
                triggerText="LOGIN" 
                triggerClassName="border border-nexus-primary text-nexus-primary hover:bg-nexus-primary hover:text-white transition-colors"
                defaultTab="login"
              />
            </>
          )}
        </div>
        
        <button 
          className="md:hidden text-gray-500 hover:text-nexus-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      <div className="bg-nexus-primary text-white">
        <div className="max-w-7xl mx-auto">
          <DesktopNav isActive={isActive} />
          <MobileNav 
            isOpen={isMenuOpen}
            user={user}
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
            navigate={navigate}
            isActive={isActive}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
