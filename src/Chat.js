import React, { useState } from 'react';
import axios from 'axios';

import './style.css';
import Messages from './Messages';

const Chat = (props) => {
  const [responses, setResponses] = useState([
    {
      text: 'Hi !!! This is Scooty here to collect some info to help you better!!!',
      isBot: true,
      id: 1,
      isDone: true,
    },
  ]);
  const [disable, setDisable] = useState(false);
  const [age, setAge] = useState(18);

  const botData = [
    {
      text: 'I would need to collect some information from you to start with can you please select your age',
      isBot: true,
      id: 2,
      isDone: false,
    },
    {
      text: 'Select Gender',
      isBot: true,
      id: 3,
      isDone: false,
    },
    {
      text: 'Specify the tests you did for the past 3 months BP , ECG , lipid test ',
      isBot: true,
      id: 4,
      isDone: false,
    },
  ];

  const [currentMessage, setCurrentMessage] = useState('');

  //voice recordings
  var leftchannel;
  var rightchannel;
  var recorder;
  var recordingLength;
  var volume;
  var mediaStream;
  var sampleRate;
  var context = null;
  var blob = null;

  //end of voice recordings

  const handleMessageSubmit = (message) => {
    const data = {
      text: 'good morning',
    };
    replyChats(message);
  };
  function selectAge(value, event) {
    setAge(value);
    // for (var i = 0; i < botData.length; i++) {
    //   alert(botData[i].isDone);
    // }
    const data = [...responses];
    data.push({
      text: 'Select Gender',
      isBot: true,
      bot: true,
    });
    data.push({
      text: 'Select Gender',
      isBot: true,
      id: 3,
      isDone: true,
    });
    setResponses(data);
  }
  const replyChats = (message) => {
    axios
      .post('https://speech2textrasa.herokuapp.com/model/parse', {
        text: message.text,
      })
      .then((response) => {
        // alert(response.data);
        // console.log(response.data);
        // const responseData = {
        //   text: response.data['message']['fulfillmentText'],
        //   isBot: true,
        // };
        // setResponses((responses) => [...responses, responseData]);
        console.log(response.data);
        const intent = response.data.intent.name;

        if (
          intent == 'greet' ||
          intent == 'mood_great' ||
          intent == 'bot_challenge' ||
          intent == 'affirm'
        ) {
          axios
            .post(
              'https://speech2textrasa.herokuapp.com/webhooks/rest/webhook',
              {
                message: message.text,
              }
            )
            .then((response) => {
              var botvalue = null;

              console.log(response.data);
              for (var i = 0; i < botData.length; i++) {
                if (botData[i].isDone == false) {
                  if (botData[i].id == 2) {
                    setDisable(true);
                  }
                  botData[i].isDone = true;
                  botvalue = botData[i];
                  break;
                }
              }
              console.log('Bot Value ' + botvalue);
              const data = [...responses];
              data.push(message);
              data.push({
                text: response.data[0].text,
                isBot: true,
                bot: true,
              });
              data.push(botvalue);
              setResponses(data);
            });
        } else {
          const data = [...responses];
          data.push(message);
          data.push({
            text: 'Please Be More Specific',
            isBot: true,
            bot: true,
          });
          setResponses(data);
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    const message = {
      text: currentMessage,
      isBot: false,
    };
    if (event.key == 'Enter') {
      setResponses((responses) => [...responses, message]);
      handleMessageSubmit(message);
      setCurrentMessage('');
    }
  };

  const recordVoice = () => {
    setTimeout(function () {
      // stop recording
      recorder.disconnect(context.destination);
      mediaStream.disconnect(recorder);

      // we flat the left and right channels down
      // Float32Array[] => Float32Array
      var leftBuffer = flattenArray(leftchannel, recordingLength);
      var rightBuffer = flattenArray(rightchannel, recordingLength);
      // we interleave both channels together
      // [left[0],right[0],left[1],right[1],...]
      var interleaved = interleave(leftBuffer, rightBuffer);

      // we create our wav file
      var buffer = new ArrayBuffer(44 + interleaved.length * 2);
      var view = new DataView(buffer);

      // RIFF chunk descriptor
      writeUTFBytes(view, 0, 'RIFF');
      view.setUint32(4, 44 + interleaved.length * 2, true);
      writeUTFBytes(view, 8, 'WAVE');
      // FMT sub-chunk
      writeUTFBytes(view, 12, 'fmt ');
      view.setUint32(16, 16, true); // chunkSize
      view.setUint16(20, 1, true); // wFormatTag
      view.setUint16(22, 2, true); // wChannels: stereo (2 channels)
      view.setUint32(24, sampleRate, true); // dwSamplesPerSec
      view.setUint32(28, sampleRate * 4, true); // dwAvgBytesPerSec
      view.setUint16(32, 4, true); // wBlockAlign
      view.setUint16(34, 16, true); // wBitsPerSample
      // data sub-chunk
      writeUTFBytes(view, 36, 'data');
      view.setUint32(40, interleaved.length * 2, true);

      // write the PCM samples
      var index = 44;
      var volume = 1;
      for (var i = 0; i < interleaved.length; i++) {
        view.setInt16(index, interleaved[i] * (0x7fff * volume), true);
        index += 2;
      }

      // our final blob
      blob = new Blob([view], { type: 'audio/wav' });

      alert('finished recording');

      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        var base64String = base64data.split(',')[1];

        axios
          .post('https://gowthambalachandhiran.pythonanywhere.com/voice', {
            file_string: base64String,
          })
          .then((response) => {
            console.log(response.data);
            const message = {
              text: 'Hello hi',
              isBot: false,
            };

            const data = [...responses];
            data.push(message);

            data.push({
              text: 'I would need to collect some information from you to start with can you please select your age',
              isBot: true,
              id: 2,
              isDone: true,
            });
            setResponses(data);
          })
          .catch((error) => {
            console.log('Error: ', error);
          });
      };
    }, 5000);
    alert('recording in progress');
    leftchannel = [];
    rightchannel = [];
    recorder = null;
    recordingLength = 0;
    volume = null;
    mediaStream = null;
    sampleRate = 48000;
    context = null;
    blob = null;

    //

    // Initialize recorder
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    navigator.getUserMedia(
      {
        audio: true,
      },
      function (e) {
        console.log('user consent');

        // creates the audio context
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();

        // creates an audio node from the microphone incoming stream
        mediaStream = context.createMediaStreamSource(e);

        // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createScriptProcessor
        // bufferSize: the onaudioprocess event is called when the buffer is full
        var bufferSize = 2048;
        var numberOfInputChannels = 2;
        var numberOfOutputChannels = 2;
        if (context.createScriptProcessor) {
          recorder = context.createScriptProcessor(
            bufferSize,
            numberOfInputChannels,
            numberOfOutputChannels
          );
        } else {
          recorder = context.createJavaScriptNode(
            bufferSize,
            numberOfInputChannels,
            numberOfOutputChannels
          );
        }

        recorder.onaudioprocess = function (e) {
          leftchannel.push(new Float32Array(e.inputBuffer.getChannelData(0)));
          rightchannel.push(new Float32Array(e.inputBuffer.getChannelData(1)));
          recordingLength += bufferSize;
        };

        // we connect the recorder
        mediaStream.connect(recorder);
        recorder.connect(context.destination);
      },
      function (e) {
        console.error(e);
      }
    );
  };

  function flattenArray(channelBuffer, recordingLength) {
    var result = new Float32Array(recordingLength);
    var offset = 0;
    for (var i = 0; i < channelBuffer.length; i++) {
      var buffer = channelBuffer[i];
      result.set(buffer, offset);
      offset += buffer.length;
    }
    return result;
  }

  function interleave(leftChannel, rightChannel) {
    var length = leftChannel.length + rightChannel.length;
    var result = new Float32Array(length);

    var inputIndex = 0;

    for (var index = 0; index < length; ) {
      result[index++] = leftChannel[inputIndex];
      result[index++] = rightChannel[inputIndex];
      inputIndex++;
    }
    return result;
  }

  function writeUTFBytes(view, offset, string) {
    for (var i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  return (
    <div className="chatSection">
      <div className="botContainer">
        <div className="messagesContainer">
          <div className="messageCard">
            <Messages messages={responses} selectAge={selectAge} />
          </div>
        </div>

        {/*The input section is 👇*/}
        <div className="inputSection">
          <button
            disabled={disable}
            onClick={recordVoice}
            class="fa fa-microphone microphone-ico"
          ></button>
          <input
            type="text"
            value={currentMessage}
            onChange={handleMessageChange}
            disabled={disable}
            onKeyDown={handleSubmit}
            placeholder="Say something..."
            className="messageInputField"
          />

          <div onTap={handleSubmit}>
            <svg
              style={{ marginRight: '10px' }}
              id="Capa_1"
              enableBackground="new 0 0 512.004 512.004"
              height="25"
              viewBox="0 0 512.004 512.004"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67-7.717-5.727-203.749-151.217-214.37-159.1l-142.1-54.96c-5.79-2.24-9.6-7.81-9.59-14.02.01-6.21 3.85-11.77 9.65-13.98l482-184c5.824-2.232 12.488-.626 16.67 4.17 3.37 3.87 4.55 9.24 3.03 14.22z"
                  fill="#94dfda"
                />
                <path
                  d="m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67l-190.05-141.05 332.31-280.84c3.37 3.87 4.55 9.24 3.03 14.22z"
                  fill="#61a7c5"
                />
                <path
                  d="m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59v-175.3c0-4.86 2.35-9.41 6.31-12.23l337-239.69c6.29-4.48 14.95-3.45 20.01 2.38 5.07 5.83 4.88 14.56-.43 20.16z"
                  fill="#eef4ff"
                />
                <path
                  d="m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59l31.01-144 332.31-280.84c5.07 5.83 4.88 14.56-.43 20.16z"
                  fill="#d9e6fc"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
