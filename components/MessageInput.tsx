import React from 'react';
import { CameraIcon, PaperclipIcon, SendIcon } from './icons';

interface MessageInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onSend, disabled = false }) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !disabled) {
      onSend();
    }
  };

  return (
    <div className="p-4 bg-[#212121] border-t border-gray-700/50 rounded-b-3xl">
      <div className="flex items-center space-x-2">
        <div className="flex-1 flex items-center bg-gray-700 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder={disabled ? "Waiting for response..." : "Type a message ..."}
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none disabled:opacity-50"
            value={value}
            onChange={onChange}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            aria-disabled={disabled}
          />
          <button className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled} aria-disabled={disabled}>
            <CameraIcon />
          </button>
          <button className="text-gray-400 hover:text-white ml-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled} aria-disabled={disabled}>
            <PaperclipIcon />
          </button>
        </div>
        <button 
          onClick={onSend}
          className="w-12 h-12 flex items-center justify-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#A94442' }}
          disabled={disabled}
          aria-disabled={disabled}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;