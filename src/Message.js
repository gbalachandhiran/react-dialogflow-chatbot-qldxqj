import React, { useState } from 'react';

const Message = ({ message, selectAge, selectGender }) => {
  const [value, onChange] = useState(18);
  const [disable, setDisable] = useState(false);
  const [gender, setGender] = useState('Male');
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
      return (
        <div className="botCard">
          <div className="radio-btn-container">
            <div
              className="radio-btn"
              onClick={() => {
                setGender('Male');
              }}
            >
              <input
                type="radio"
                value={gender}
                name="gender"
                checked={gender == 'Male'}
              />
              Male
            </div>
            <div
              className="radio-btn"
              onClick={() => {
                setGender('Female');
              }}
            >
              <input
                type="radio"
                value={gender}
                name="gender"
                checked={gender == 'Female'}
              />
              Female
            </div>
            <div
              className="radio-btn"
              onClick={() => {
                setGender('Other');
              }}
            >
              <input
                type="radio"
                value={gender}
                name="gender"
                checked={gender == 'Other'}
              />
              Other
            </div>
          </div>
          <div>
            <button
              onClick={(event) => {
                selectGender(gender, event);
              }}
            >
              Select
            </button>
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
