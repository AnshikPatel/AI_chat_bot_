import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { type Message, MessageType, type User } from './types';
import { GoogleGenAI } from '@google/genai';

const currentUser: User = { id: 'user_me', name: 'Me' };
const botUser: User = { id: 'bot_1', name: 'Fun Friday Bot', avatarUrl: 'https://picsum.photos/id/23/50/50', isBot: true };


const initialMessages: Message[] = [
    {
        id: '1',
        user: { id: 'user_2', name: 'Anonymous' },
        text: 'Someone order Bornvita!!',
        timestamp: '11:35 AM',
        type: MessageType.INCOMING,
    },
    {
        id: '2',
        user: { id: 'user_3', name: 'Anonymous' },
        text: 'hahahahah!!',
        timestamp: '11:38 AM',
        type: MessageType.INCOMING,
    },
    {
        id: '3',
        user: { id: 'user_4', name: 'Anonymous' },
        text: "I'm Excited For this Event! Ho-Ho",
        timestamp: '11:56 AM',
        type: MessageType.INCOMING,
    },
    {
        id: '4',
        user: currentUser,
        text: 'Hi Guysss 👋',
        timestamp: '12:31 PM',
        type: MessageType.OUTGOING,
        read: true,
    },
    {
        id: '5',
        user: { id: 'user_5', name: 'Anonymous', online: true },
        text: 'Hello!',
        timestamp: '12:35 PM',
        type: MessageType.INCOMING,
    },
    {
        id: '6',
        user: { id: 'user_6', name: 'Anonymous' },
        text: 'Yessss!!!!!!!',
        timestamp: '12:42 PM',
        type: MessageType.INCOMING,
    },
    {
        id: '7',
        user: currentUser,
        text: 'Maybe I am not attending this event!',
        timestamp: '1:36 PM',
        type: MessageType.OUTGOING,
        read: true,
    },
    {
        id: '8',
        user: { id: 'user_7', name: 'Abhay Shukla', avatarUrl: 'https://picsum.photos/id/1005/50/50' },
        text: 'We have Surprise For you!!',
        timestamp: '11:35 AM', // Note: Timestamp is out of order in the original image
        type: MessageType.INCOMING,
    },
    {
        id: '9',
        type: MessageType.SYSTEM,
        text: "Now you're appearing as Anonymous!",
        timestamp: '',
        user: { id: 'system', name: 'System' },
    }
];


const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const ai = useRef<GoogleGenAI | null>(null);

    useEffect(() => {
        if (process.env.API_KEY) {
            ai.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
        }
    }, []);

    const generateBotResponse = async (prompt: string) => {
        if (!ai.current) {
            console.error("AI client not initialized. Make sure API_KEY is set.");
             const errorMessage: Message = {
                 id: String(Date.now()),
                 user: botUser,
                 text: "My brain is offline! An API key is required to chat with me.",
                 timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                 type: MessageType.INCOMING,
            };
            setMessages(prev => [...prev, errorMessage]);
            setIsBotTyping(false);
            return;
        }

        setIsBotTyping(true);
        try {
            const response = await ai.current.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: "You are a fun and friendly chatbot for a group chat called 'Fun Friday Group'. Keep your responses concise, cheerful, and relevant to a casual, fun group chat. Use emojis where appropriate.",
                }
            });
            const botResponseText = response.text;

            const botMessage: Message = {
                id: String(Date.now()),
                user: botUser,
                text: botResponseText,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                type: MessageType.INCOMING,
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error generating bot response:", error);
            const errorMessage: Message = {
                id: String(Date.now()),
                user: botUser,
                text: "Oops, I'm having a little trouble thinking right now. Please try again in a moment!",
                timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                type: MessageType.INCOMING,
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsBotTyping(false);
        }
    };

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.type === MessageType.OUTGOING && lastMessage.user.id === currentUser.id) {
            // A short delay to simulate a more natural response time
            setTimeout(() => generateBotResponse(lastMessage.text), 500);
        }
    }, [messages]);


    const handleSendMessage = () => {
        if (newMessage.trim() === '' || isBotTyping) return;

        const message: Message = {
            id: String(Date.now()),
            user: currentUser,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
            type: MessageType.OUTGOING,
            read: false,
        };

        setMessages(prevMessages => [...prevMessages, message]);
        setNewMessage('');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 font-sans">
            <div className="w-full max-w-md h-[95vh] max-h-[800px] bg-[#212121] text-white rounded-3xl shadow-2xl flex flex-col">
                <Header />
                <MessageList messages={messages} currentUser={currentUser} isBotTyping={isBotTyping} botUser={botUser} />
                <MessageInput 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onSend={handleSendMessage}
                    disabled={isBotTyping}
                />
            </div>
        </div>
    );
};

export default App;
