
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from './NavLinks';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthDialog from '@/components/auth/AuthDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfile } from '@/hooks/useAuth';

interface MobileNavProps {
  isOpen: boolean;
  user: UserProfile | null;
  isAuthenticated: boolean;
  handleLogout: () => void;
  navigate: ReturnType<typeof useNavigate>;
  isActive: (path: string) => boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, user, isAuthenticated, handleLogout, navigate, isActive }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3 bg-white text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-nexus-primary/10 text-nexus-primary'
                    : 'hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              {isAuthenticated && user ? (
                <div className="flex items-center px-3 py-2">
                  <Avatar className="h-10 w-10">
                    {user.avatarUrl ? (
                      <AvatarImage src={user.avatarUrl} alt={user.fullName || ''} />
                    ) : (
                       <AvatarFallback className="bg-gradient-to-br from-nexus-primary to-blue-600 text-white font-semibold">
                          {user.fullName ? user.fullName.substring(0, 2).toUpperCase() : (user.email || 'U').substring(0,2).toUpperCase()}
                        </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-800">{user.fullName}</p>
                    <p className="text-sm font-medium text-gray-500">{user.email}</p>
                  </div>
                </div>
              ) : null}
              <div className="mt-3 space-y-2 px-2">
                {isAuthenticated ? (
                  <>
                    <Button
                      onClick={() => navigate('/dashboard')}
                      className="w-full justify-start"
                      variant="ghost"
                    >
                      Dashboard
                    </Button>
                     <Button
                      onClick={() => navigate('/alumni')}
                      className="w-full justify-start"
                      variant="ghost"
                    >
                      My Profile
                    </Button>
                    <Button onClick={handleLogout} className="w-full justify-start" variant="ghost">
                      Log out
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                     <AuthDialog 
                      triggerText="JOIN / LOGIN" 
                      triggerClassName="w-full bg-gradient-to-r from-nexus-primary to-blue-600 hover:from-nexus-primary/90 hover:to-blue-600/90 text-white font-medium px-4 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                      defaultTab="login"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
