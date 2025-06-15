
import React from "react";
import { Award } from "lucide-react";

export function PointsSummary({ points = 0 }: { points?: number }) {
  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg border bg-white">
      <Award className="h-8 w-8 text-yellow-500" />
      <div>
        <div className="text-xl font-bold">{points} pts</div>
        <div className="text-xs text-gray-500">Total Points Earned</div>
      </div>
    </div>
  );
}
