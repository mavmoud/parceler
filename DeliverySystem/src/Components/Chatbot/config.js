import React from 'react'; 
import { createChatBotMessage } from 'react-chatbot-kit';
import Options from './Options'; 

const config = {
  botName: "DeliveryBot",
  initialMessages: [
    createChatBotMessage("What would you like to do?", {
      widget: "optionsWidget", 
    }),
  ],
  widgets: [
    {
      widgetName: "optionsWidget", 
      widgetFunc: (props) => {
        return React.createElement(Options, props); 
      },
    },
  ],
};

export default config;
