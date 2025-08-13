import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  color?: "primary" | "secondary" | "accent";
}

export function MetricCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  color = "primary" 
}: MetricCardProps) {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary-foreground bg-secondary/20",
    accent: "text-accent-foreground bg-accent/20"
  };

  return (
    <GlassCard hoverEffect className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <div className="space-y-1">
              <AnimatedCounter value={typeof value === 'number' ? value : parseInt(value.toString())} />
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            </div>
            {trend && (
              <div className="flex items-center gap-1 pt-2">
                <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                  trend.value > 0 ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                }`}>
                  <span>{trend.value > 0 ? '↗' : '↘'}</span>
                  <span>{Math.abs(trend.value)}% {trend.label}</span>
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </GlassCard>
  );
}