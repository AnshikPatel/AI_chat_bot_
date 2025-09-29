
import React from 'react';
import { type Message, MessageType } from '../types';
import { DoubleCheckIcon, AnonymousIcon } from './icons';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {

  if (message.type === MessageType.SYSTEM) {
    return (
      <div className="flex items-center justify-center my-2">
        <div className="text-xs text-gray-400 flex items-center gap-2">
          <AnonymousIcon className="w-4 h-4" />
          <span>{message.text}</span>
          <AnonymousIcon className="w-4 h-4" />
        </div>
      </div>
    );
  }

  const isOutgoing = message.type === MessageType.OUTGOING;

  const Avatar = () => {
    if (isOutgoing) return null;

    if (message.user.avatarUrl) {
      return <img src={message.user.avatarUrl} alt={message.user.name} className="w-8 h-8 rounded-full object-cover" />;
    }
    
    return (
        <div className="relative w-8 h-8 rounded-full bg-gray-300 border-2 border-gray-400">
            {message.user.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-300"></div>}
        </div>
    );
  }

  return (
    <div className={`flex items-end gap-2 ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
      {!isOutgoing && <Avatar />}
      <div className={`flex flex-col ${isOutgoing ? 'items-end' : 'items-start'}`}>
        {!isOutgoing && (
          <span className="text-sm text-gray-400 mb-1 ml-2">{message.user.name}</span>
        )}
        <div 
          className={`relative max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${isOutgoing ? 'bg-[#A94442] text-white rounded-br-none' : 'bg-gray-200 text-black rounded-bl-none'}`}
        >
          <p className="break-words">{message.text}</p>
          <div className={`text-xs mt-1 flex items-center gap-1 ${isOutgoing ? 'text-gray-200' : 'text-gray-500'} ${isOutgoing ? 'justify-end' : ''}`}>
            <span>{message.timestamp}</span>
            {isOutgoing && message.read && <DoubleCheckIcon />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
