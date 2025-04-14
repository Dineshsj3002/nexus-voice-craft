
import { useState, useRef, useEffect } from 'react';
import { showSuccessToast } from '@/components/SuccessToast';

interface UseSpeechInteractionProps {
  onSpeechResult: (text: string) => void;
  onSpeakingStatusChange?: (isSpeaking: boolean) => void;
}

export const useSpeechInteraction = ({ onSpeechResult, onSpeakingStatusChange }: UseSpeechInteractionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        onSpeechResult(transcript);
      };

      recognition.onend = () => {
        if (isListening) {
          try {
            recognition.start();
          } catch (error) {
            console.error('Error restarting speech recognition:', error);
            setIsListening(false);
          }
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      speechRecognitionRef.current = recognition;
    }

    // Initialize speech synthesis
    speechSynthesisRef.current = new SpeechSynthesisUtterance();
    speechSynthesisRef.current.lang = 'en-US';
    speechSynthesisRef.current.rate = 1;
    speechSynthesisRef.current.pitch = 1;

    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
    };
  }, [isListening, onSpeechResult]);

  const startListening = () => {
    if (!speechRecognitionRef.current) {
      showSuccessToast({ 
        message: 'Speech recognition not supported in your browser', 
        emoji: '⚠️' 
      });
      return;
    }

    try {
      speechRecognitionRef.current.start();
      setIsListening(true);
      showSuccessToast({ message: 'Listening...', emoji: '🎤' });
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      showSuccessToast({ 
        message: 'Could not start listening. Please try again.', 
        emoji: '⚠️' 
      });
    }
  };

  const stopListening = () => {
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = async (text: string) => {
    if (!speechSynthesisRef.current) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    setIsSpeaking(true);
    onSpeakingStatusChange?.(true);

    // Set the text to be spoken
    speechSynthesisRef.current.text = text;

    // Return a promise that resolves when speech is done
    return new Promise<void>((resolve) => {
      speechSynthesisRef.current!.onend = () => {
        setIsSpeaking(false);
        onSpeakingStatusChange?.(false);
        resolve();
      };

      // Start speaking
      window.speechSynthesis.speak(speechSynthesisRef.current!);
    });
  };

  return {
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak
  };
};
