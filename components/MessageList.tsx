import React, { useEffect, useRef } from 'react';
import { type Message, type User } from '../types';
import MessageBubble from './MessageBubble';

const TypingIndicator: React.FC<{ user: User }> = ({ user }) => {
  const Avatar = () => {
    if (user.avatarUrl) {
      return <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover" />;
    }
    return (
      <div className="relative w-8 h-8 rounded-full bg-gray-300 border-2 border-gray-400">
        {user.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-300"></div>}
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2 justify-start">
      <Avatar />
      <div className="flex flex-col items-start">
        <div className="bg-gray-200 text-black rounded-2xl rounded-bl-none px-4 py-2">
          <div className="flex items-center justify-center space-x-1 h-5">
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '-0.3s' }}></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '-0.15s' }}></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MessageListProps {
  messages: Message[];
  currentUser: User;
  isBotTyping: boolean;
  botUser: User;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isBotTyping, botUser }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#333333]">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isBotTyping && <TypingIndicator user={botUser} />}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;