import React, { useState } from "react";
import axios from 'axios';

const MessageRequest = () => {
  const [text, setText] = useState("")
  const [uppercase, setUppercase] = useState(false)
  const [reverse, setReverse] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = { text, uppercase, reverse }
    console.log("Sending Request " + JSON.stringify(data));

    axios.post('http://localhost:8080/api/send-request', data)
      .then(function (response) {
        if (response.status === 202) {
          console.log("Successfully sent message");
        }
      })
      .catch(function (error) {
        console.log("Error sending message", error);
      });
  }

  return (
    <div>
      <h2>Requests</h2>
      <form id="requests" method="post" onSubmit={(event) => handleSubmit(event)}>
        <input id="request-text"
          type="text"
          name="text"
          autoFocus="autofocus"
          onChange={(event) => setText(event.target.value)}
          value={text} />
        <div id="request-uppercase-option">
          <input id="request-uppercase"
            type="checkbox"
            name="uppercase"
            onChange={(event) => setUppercase(event.target.checked)}
            checked={uppercase} />
          <label htmlFor="request-uppercase">Uppercase</label>
        </div>
        <div id="request-reverse-option">
          <input id="request-reverse"
            type="checkbox"
            name="reverse"
            onChange={(event) => setReverse(event.target.checked)}
            checked={reverse} />
          <label htmlFor="request-reverse">Reverse</label>
        </div>
        <button type="submit">Send Request</button>
      </form>
    </div>
  );
}

export default MessageRequest;