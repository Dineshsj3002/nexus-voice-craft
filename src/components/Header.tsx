
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import AuthDialog from "./auth/AuthDialog";
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-nexus-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold">
          KIOT Alumni Association
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="md:hidden">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Explore the KIOT Alumni Association
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm">Welcome, {user.user_metadata?.full_name || user.email}</span>
              <AuthDialog 
                triggerText="Dashboard" 
                triggerClassName="bg-white text-nexus-primary hover:bg-gray-100"
              />
            </div>
          ) : (
            <>
              <AuthDialog 
                triggerText="Login" 
                triggerClassName="bg-transparent border border-white hover:bg-white hover:text-nexus-primary"
                defaultTab="login"
              />
              <AuthDialog 
                triggerText="Register" 
                triggerClassName="bg-white text-nexus-primary hover:bg-gray-100"
                defaultTab="register"
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
