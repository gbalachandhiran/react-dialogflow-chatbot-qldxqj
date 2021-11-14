import React, { useState } from 'react';

const Message = ({ message }) => {
  const [value, onChange] = useState(18);
  if (message.isBot) {
    if (message.id == 1 && message.isDone) {
      return (
        <div className="botCard">
          <p
            style={{
              paddingLeft: '16px',
              paddingRight: '10px',
              fontFamily: 'Montserrat',
              paddingTop: '7.5px',
              paddingBottom: '7.5px',
              fontWeight: 700,
            }}
          >
            {message.text}
          </p>
        </div>
      );
    }
    if (message.id == 2 && message.isDone) {
      return (
        <div className="botCard">
          <p
            style={{
              paddingLeft: '16px',
              paddingRight: '10px',
              fontFamily: 'Montserrat',
              paddingTop: '7.5px',
              paddingBottom: '7.5px',
              fontWeight: 700,
            }}
          >
            Please Select Your Age
          </p>
          <div className="slider-parent">
            <input
              type="range"
              min="18"
              max="100"
              value={value}
              onChange={({ target: { value: radius } }) => {
                onChange(radius);
              }}
            />
            <div className="buble">{value}</div>
            <button click>Select</button>
          </div>
        </div>
      );
    }

    if (message.bot) {
      return (
        <div className="botCard">
          <p
            style={{
              paddingLeft: '16px',
              paddingRight: '10px',
              fontFamily: 'Montserrat',
              paddingTop: '7.5px',
              paddingBottom: '7.5px',
              fontWeight: 700,
            }}
          >
            {message.text}
          </p>
        </div>
      );
    } else {
      return null;
    }
  } else {
    return (
      <div className="userCard">
        <p
          style={{
            paddingLeft: '16px',
            paddingRight: '10px',
            fontFamily: 'Montserrat',
            fontWeight: 700,
          }}
        >
          {message.text}
        </p>
      </div>
    );
  }
};

export default Message;
