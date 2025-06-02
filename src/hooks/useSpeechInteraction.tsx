
import { useState, useRef, useEffect, useCallback } from 'react';
import { showSuccessToast } from '@/components/SuccessToast';
import { useMicrophonePermission } from './useMicrophonePermission';

interface UseSpeechInteractionProps {
  onSpeechResult: (text: string) => void;
  onSpeakingStatusChange?: (isSpeaking: boolean) => void;
}

export const useSpeechInteraction = ({ onSpeechResult, onSpeakingStatusChange }: UseSpeechInteractionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { permissionStatus, isSupported, requestPermission } = useMicrophonePermission();

  // Initialize speech recognition once
  const initializeSpeechRecognition = useCallback(() => {
    if (speechRecognitionRef.current || !isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    // Handle speech results
    recognition.onresult = (event) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }

      if (finalTranscript.trim()) {
        console.log('Final speech result:', finalTranscript);
        onSpeechResult(finalTranscript.trim());
        
        // Stop listening after getting final result
        setTimeout(() => {
          if (isListening) {
            stopListening();
          }
        }, 500);
      }

      // Reset silence timer on speech
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      
      // Set new silence timer
      silenceTimerRef.current = setTimeout(() => {
        if (isListening) {
          console.log('Silence detected, stopping listening');
          stopListening();
        }
      }, 3000); // 3 seconds of silence
    };

    // Handle recognition start
    recognition.onstart = () => {
      console.log('Speech recognition started');
      setError(null);
    };

    // Handle recognition end
    recognition.onend = () => {
      console.log('Speech recognition ended');
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      
      // Only restart if still supposed to be listening and no error
      if (isListening && !error) {
        restartTimeoutRef.current = setTimeout(() => {
          try {
            if (speechRecognitionRef.current && isListening) {
              speechRecognitionRef.current.start();
            }
          } catch (err) {
            console.error('Error restarting speech recognition:', err);
            setIsListening(false);
          }
        }, 100);
      }
    };

    // Handle errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone access and try again.');
        showSuccessToast({ message: 'Microphone access denied', emoji: '🚫' });
      } else if (event.error === 'no-speech') {
        console.log('No speech detected, continuing...');
        return; // Don't treat as error
      } else {
        setError(`Speech recognition error: ${event.error}`);
      }
      
      setIsListening(false);
    };

    speechRecognitionRef.current = recognition;
    setIsInitialized(true);
  }, [isSupported, onSpeechResult, isListening, error]);

  // Initialize speech synthesis
  useEffect(() => {
    if (!speechSynthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      speechSynthesisRef.current = utterance;
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    initializeSpeechRecognition();
  }, [initializeSpeechRecognition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.abort();
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const startListening = async () => {
    if (!isInitialized || !speechRecognitionRef.current) {
      showSuccessToast({ 
        message: 'Speech recognition not available', 
        emoji: '⚠️' 
      });
      return;
    }

    // Request microphone permission first
    if (permissionStatus !== 'granted') {
      const granted = await requestPermission();
      if (!granted) {
        showSuccessToast({ 
          message: 'Microphone permission required for voice input', 
          emoji: '🎤' 
        });
        return;
      }
    }

    try {
      // Stop any current speech synthesis
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      onSpeakingStatusChange?.(false);

      // Start recognition
      speechRecognitionRef.current.start();
      setIsListening(true);
      setError(null);
      
      showSuccessToast({ message: 'Listening... Speak now', emoji: '🎤' });
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setError('Could not start listening. Please try again.');
      showSuccessToast({ 
        message: 'Could not start listening. Please try again.', 
        emoji: '⚠️' 
      });
    }
  };

  const stopListening = () => {
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
    }
    
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }
    
    setIsListening(false);
    console.log('Stopped listening');
  };

  const speak = async (text: string): Promise<void> => {
    if (!speechSynthesisRef.current || !text.trim()) return;

    // Stop any ongoing speech and listening
    window.speechSynthesis.cancel();
    if (isListening) {
      stopListening();
    }
    
    setIsSpeaking(true);
    onSpeakingStatusChange?.(true);

    return new Promise<void>((resolve) => {
      if (!speechSynthesisRef.current) {
        resolve();
        return;
      }

      speechSynthesisRef.current.text = text;

      speechSynthesisRef.current.onend = () => {
        setIsSpeaking(false);
        onSpeakingStatusChange?.(false);
        console.log('Finished speaking');
        resolve();
      };

      speechSynthesisRef.current.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
        onSpeakingStatusChange?.(false);
        resolve();
      };

      try {
        window.speechSynthesis.speak(speechSynthesisRef.current);
      } catch (error) {
        console.error('Error starting speech synthesis:', error);
        setIsSpeaking(false);
        onSpeakingStatusChange?.(false);
        resolve();
      }
    });
  };

  const retryInitialization = () => {
    setError(null);
    setIsInitialized(false);
    speechRecognitionRef.current = null;
    initializeSpeechRecognition();
  };

  return {
    isListening,
    isSpeaking,
    isInitialized,
    error,
    permissionStatus,
    isSupported,
    startListening,
    stopListening,
    speak,
    retryInitialization
  };
};
