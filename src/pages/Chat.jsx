import React from 'react';
import Chatbot from 'react-chatbot-kit'; 
import 'react-chatbot-kit/build/main.css';

import config from "../chatbot/config";
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';

import './chatbot.css';

const Chat = () => {
    return (
        <div>
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
            />
        </div>
    );
}

export default Chat;
