import React, { useState } from "react";
import {
  Form,
  FormGroup,
  TextInput,
  Checkbox,
  ActionGroup,
  Button
} from '@patternfly/react-core';
import axios from 'axios';

const MessageRequest = () => {
  const [text, setText] = useState("")
  const [uppercase, setUppercase] = useState(false)
  const [reverse, setReverse] = useState(false)

  const clearState = () => {
    setText("");
    setUppercase(false);
    setReverse(false);
  }
  const handleSubmit = () => {
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
      <Form>
        <FormGroup label="Enter a message to send:" isRequired>
          <TextInput type="text"
            isRequired
            id="text"
            name="text"
            autoFocus="autofocus"
            onChange={setText}
            value={text} />
        </FormGroup>

        <FormGroup label="Response formatting:">
          <Checkbox id="request-uppercase"
            label="Uppercase"
            type="checkbox"
            name="uppercase"
            onChange={setUppercase}
            isChecked={uppercase} />
          <Checkbox id="request-reverse"
            label="Reverse"
            type="checkbox"
            name="reverse"
            onChange={setReverse}
            isChecked={reverse} />
        </FormGroup>
        <ActionGroup>
          <Button variant="primary" onClick={handleSubmit}>Send Request</Button>
          <Button variant="link" onClick={clearState}>Cancel</Button>
        </ActionGroup>
      </Form>
    </div>
  );
}

export default MessageRequest;