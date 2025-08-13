
import React from "react";
import { Award } from "lucide-react";
import { CardContent } from "@/components/ui/card";

export function PointsSummary({ points = 0 }: { points?: number }) {
  return (
    <CardContent className="flex items-center gap-4 p-4" aria-label="Total points summary">
      <div className="rounded-full bg-primary/10 p-3">
        <Award className="h-6 w-6 text-primary" aria-hidden="true" />
      </div>
      <div>
        <div className="text-2xl font-semibold leading-tight">{points} pts</div>
        <div className="text-sm text-muted-foreground">Total points earned</div>
      </div>
    </CardContent>
  );
}
