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

const MessageRequest = ({ responseHandler }) => {
  const [text, setText] = useState("")
  const [uppercase, setUppercase] = useState(false)
  const [reverse, setReverse] = useState(false)

  const clearState = () => {
    setText("");
    setUppercase(false);
    setReverse(false);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    //TODO prevet SQL  Injection, JS Injection 
    var data = { text, uppercase, reverse }
    //console.log("Sending Request " + JSON.stringify(data));

    axios.post(process.env.REACT_APP_API_URL, data)
      .then(function (response) {
        //console.log("Received response ", response);
        if (response.status === 200) {
          if (response.data) {
            responseHandler(response.data);
          } else {
            console.log("No data in response");
          }
        }
      })
      .catch(function (error) {
        console.log("Error sending message", error);
      });
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup label="Enter a message to send:" isRequired>
          <TextInput type="text"
            isRequired
            id="text"
            name="text"
            autoFocus
            onChange={setText}
            value={text}
            maxLength="30" />
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
          <Button variant="primary"
            onClick={handleSubmit}
            isDisabled={text.length === 0}>Send Request</Button>
          <Button variant="link" onClick={clearState}>Cancel</Button>
        </ActionGroup>
      </Form>
    </div>
  );
}

export default MessageRequest;