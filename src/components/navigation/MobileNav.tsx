
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  UserCircle, 
  Settings, 
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AuthDialog from '@/components/auth/AuthDialog';

export const MobileNavLink = ({ to, children, isActive = false }: { to: string; children: React.ReactNode; isActive?: boolean }) => (
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

interface MobileNavProps {
  isOpen: boolean;
  user: any;
  isAuthenticated: boolean;
  handleLogout: () => void;
  navigate: (path: string) => void;
  isActive: (path: string) => boolean;
}

export const MobileNav = ({ 
  isOpen, 
  user, 
  isAuthenticated, 
  handleLogout, 
  navigate, 
  isActive 
}: MobileNavProps) => {
  if (!isOpen) return null;

  return (
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
                triggerText="JOIN AS STUDENT" 
                triggerClassName="bg-nexus-primary text-white w-full hover:bg-nexus-primary/90"
                defaultTab="register"
              />
              <AuthDialog 
                triggerText="JOIN AS ALUMNI" 
                triggerClassName="bg-yellow-400 text-blue-900 w-full hover:bg-yellow-500"
                defaultTab="register"
              />
              <AuthDialog 
                triggerText="LOGIN" 
                triggerClassName="border-white text-white w-full hover:bg-white hover:text-nexus-primary"
                defaultTab="login"
              />
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
