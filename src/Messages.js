import React from 'react';
import './style.css';
import Message from './Message';

const Messages = ({ messages, selectAge, selectGender }) => {
  console.log('Messages: ' + messages);
  return (
    <div className="messagesSection">
      {messages.map((message) => {
        return (
          <div className="messagesContainer">
            <Message
              message={message}
              selectAge={selectAge}
              selectGender={selectGender}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
