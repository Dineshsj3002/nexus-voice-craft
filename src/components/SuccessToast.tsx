
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

type SuccessToastProps = {
  message: string;
  emoji?: string;
};

export const showSuccessToast = ({ message, emoji = '✅' }: SuccessToastProps) => {
  toast.success(
    <div className="flex items-center space-x-2">
      <span className="text-lg">{emoji}</span>
      <span>{message}</span>
    </div>
  );
};

export const toastTypes = {
  booking: {
    message: 'Session booked!',
    emoji: '📅',
  },
  interview: {
    message: 'Great job today!',
    emoji: '🎯',
  },
  question: {
    message: 'Question posted!',
    emoji: '💬',
  },
  connection: {
    message: 'Connection made!',
    emoji: '🤝',
  },
  profile: {
    message: 'Profile updated!',
    emoji: '✨',
  },
};

const SuccessToast: React.FC = () => {
  return null; // This component is just for organization, all functionality is in the exported functions
};

export default SuccessToast;
