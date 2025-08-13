import React from "react";
import { User, Calendar, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  userName?: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground"
    >
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back{userName ? `, ${userName}` : ""}
            </h1>
            <p className="text-primary-foreground/80">
              Your alumni hub at a glance
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-primary-foreground/90">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}