import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/ui/loader";

type NotificationPreferences = {
  enable_email?: boolean | null;
  enable_sms?: boolean | null;
  enable_push?: boolean | null;
  weekly_digest?: boolean | null;
};

export function NotificationPreferencesCard({
  preferences,
  onUpdate,
  updating,
}: {
  preferences: NotificationPreferences;
  onUpdate: (updates: Partial<NotificationPreferences>) => Promise<void>;
  updating?: boolean;
}) {
  const { toast } = useToast();
  const [localState, setLocalState] = React.useState(preferences);

  React.useEffect(() => {
    setLocalState(preferences);
  }, [preferences]);

  const handleChange = async (
    field: keyof NotificationPreferences,
    value: boolean,
  ) => {
    setLocalState((prev) => ({ ...prev, [field]: value }));
    try {
      await onUpdate({ [field]: value });
      toast({
        title: "Preferences updated!",
        description: `Saved ${field.replace("_", " ")} notification.`,
      });
    } catch {
      setLocalState(preferences); // revert UI
      toast({
        title: "Update failed",
        description: "Unable to save your preferences.",
        variant: "destructive",
      });
    }
  };

  if (!preferences) {
    return <div className="text-gray-500 py-2 text-sm">Loading preferences…</div>;
  }

  return (
    <div className="p-6 border rounded-lg space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <span>Email Notifications</span>
        {updating ? (
          <Loader size={18} />
        ) : (
          <Switch
            checked={!!localState.enable_email}
            onCheckedChange={(v) => handleChange("enable_email", v)}
            disabled={updating}
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <span>SMS Notifications</span>
        {updating ? (
          <Loader size={18} />
        ) : (
          <Switch
            checked={!!localState.enable_sms}
            onCheckedChange={(v) => handleChange("enable_sms", v)}
            disabled={updating}
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <span>Push Notifications</span>
        {updating ? (
          <Loader size={18} />
        ) : (
          <Switch
            checked={!!localState.enable_push}
            onCheckedChange={(v) => handleChange("enable_push", v)}
            disabled={updating}
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <span>Weekly Digest</span>
        {updating ? (
          <Loader size={18} />
        ) : (
          <Switch
            checked={!!localState.weekly_digest}
            onCheckedChange={(v) => handleChange("weekly_digest", v)}
            disabled={updating}
          />
        )}
      </div>
    </div>
  );
}
