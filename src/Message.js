import React, { useState } from 'react';

const Message = ({ message, selectAge }) => {
  const [value, onChange] = useState(18);
  const [disable, setDisable] = useState(false);
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
              disabled={disable}
              onChange={({ target: { value: radius } }) => {
                onChange(radius);
              }}
            />
            <div className="buble">{value}</div>
            <button
              onClick={(event) => {
                setDisable(true);
                selectAge(value, event);
              }}
            >
              Select
            </button>
          </div>
        </div>
      );
    }

    if (message.id == 3 && message.isDone) {
      return <div className="botCard"></div>;
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
