
import React from "react";
import { Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCard from "@/components/animations/AnimatedCard";

export function PointsSummary({ points = 0 }: { points?: number }) {
  return (
    <AnimatedCard hoverEffect="lift">
      <Card aria-label="Total points summary">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Award className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <div className="text-2xl font-semibold leading-tight">{points} pts</div>
            <div className="text-sm text-muted-foreground">Total points earned</div>
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
}
