
import { useState, useEffect } from 'react';

export const useMicrophonePermission = () => {
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | 'checking'>('prompt');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if getUserMedia is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsSupported(false);
      return;
    }

    // Check current permission status
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'microphone' as PermissionName })
        .then(permission => {
          setPermissionStatus(permission.state as any);
          
          permission.onchange = () => {
            setPermissionStatus(permission.state as any);
          };
        })
        .catch(() => {
          // Fallback if permissions API not available
          setPermissionStatus('prompt');
        });
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) return false;

    setPermissionStatus('checking');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Clean up immediately
      setPermissionStatus('granted');
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setPermissionStatus('denied');
      return false;
    }
  };

  return {
    permissionStatus,
    isSupported,
    requestPermission
  };
};
