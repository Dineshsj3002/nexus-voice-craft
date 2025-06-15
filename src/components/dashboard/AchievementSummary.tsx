
import React from "react";
import { Award } from "lucide-react";

type Achievement = {
  id: string;
  title?: string;
  description?: string;
  obtained_at?: string;
  achievement?: { name: string; description: string; badge_icon?: string };
};

export default function AchievementSummary({ achievements }: { achievements: Achievement[] }) {
  if (!achievements.length)
    return (
      <div className="text-gray-500 text-sm py-4 text-center">
        No achievements yet.
      </div>
    );
  return (
    <div className="flex flex-col gap-3">
      {achievements.slice(0, 3).map((a) => (
        <div key={a.id} className="flex gap-3 items-center">
          <div className="bg-primary/10 p-2 rounded-full">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <span className="block font-medium">
              {a.achievement?.name || a.title}
            </span>
            <span className="text-xs text-gray-500">
              {a.achievement?.description || a.description}
            </span>
            <span className="block text-xs text-gray-400">
              Achieved {a.obtained_at ? new Date(a.obtained_at).toLocaleDateString() : ""}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
