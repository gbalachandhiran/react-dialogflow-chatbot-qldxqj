import React from 'react';
import './style.css';
import Message from './Message';

const Messages = ({ messages, selectAge }) => {
  console.log('Messages: ' + messages);
  return (
    <div className="messagesSection">
      {messages.map((message) => {
        return (
          <div className="messagesContainer">
            <Message message={message} selectAge={selectAge} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
