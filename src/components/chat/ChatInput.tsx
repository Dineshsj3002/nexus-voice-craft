
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Camera, Mic, MicOff, Smile, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onVoiceMessage?: (audioBlob: Blob) => void;
  onFileAttach?: (files: FileList) => void;
  onImageAttach?: (files: FileList) => void;
  replyingTo?: {
    id: string;
    text: string;
    sender: string;
  };
  onCancelReply?: () => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onVoiceMessage,
  onFileAttach,
  onImageAttach,
  replyingTo,
  onCancelReply,
  disabled = false
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬'
  ];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        onVoiceMessage?.(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingTime(0);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileAttach?.(files);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageAttach?.(files);
    }
  };

  const insertEmoji = (emoji: string) => {
    onChange(value + emoji);
  };

  return (
    <div className="bg-whatsapp-panel border-t border-whatsapp-border p-3">
      {/* Reply preview */}
      {replyingTo && (
        <div className="mb-3 p-2 bg-white rounded-lg border-l-4 border-whatsapp-primary flex justify-between items-start">
          <div className="flex-1">
            <div className="text-sm font-medium text-whatsapp-primary">
              Replying to {replyingTo.sender}
            </div>
            <div className="text-sm text-whatsapp-textSecondary truncate">
              {replyingTo.text}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onCancelReply}
            className="p-1 h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Voice recording UI */}
      {isRecording && (
        <div className="mb-3 flex items-center justify-between bg-white rounded-lg p-3 border">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Recording...</span>
            <span className="text-sm text-whatsapp-textSecondary">
              {formatRecordingTime(recordingTime)}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={cancelRecording}>
              Cancel
            </Button>
            <Button size="sm" onClick={stopRecording} className="bg-whatsapp-primary hover:bg-whatsapp-dark">
              Send
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* Attachment button */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-whatsapp-textSecondary hover:text-whatsapp-text">
              <Paperclip className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" side="top">
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4 mr-2" />
                Document
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => imageInputRef.current?.click()}
              >
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Message input */}
        <div className="flex-1 relative">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message"
            className="min-h-0 max-h-32 resize-none rounded-lg border-0 bg-white focus:ring-1 focus:ring-whatsapp-primary pr-10"
            disabled={disabled || isRecording}
            rows={1}
          />
          
          {/* Emoji picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1 h-8 w-8 text-whatsapp-textSecondary hover:text-whatsapp-text"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3" side="top">
              <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    className="text-xl hover:bg-gray-100 rounded p-1 transition-colors"
                    onClick={() => insertEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Send/Voice button */}
        {value.trim() ? (
          <Button 
            onClick={onSend}
            disabled={disabled}
            className="bg-whatsapp-primary hover:bg-whatsapp-dark text-white rounded-full h-10 w-10 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={stopRecording}
            className={`rounded-full h-10 w-10 p-0 ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-whatsapp-primary hover:bg-whatsapp-dark'
            } text-white`}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.txt,.zip,.rar"
      />
      <input
        ref={imageInputRef}
        type="file"
        className="hidden"
        multiple
        onChange={handleImageSelect}
        accept="image/*"
        capture="environment"
      />
    </div>
  );
};

export default ChatInput;
