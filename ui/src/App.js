import React, { useState } from 'react';
import { Divider, Flex, FlexItem } from '@patternfly/react-core';
import _ from 'lodash';

//Application 
import './App.css';
import MessageRequest from './components/MessageRequest'
import MessageResponse from './components/MessageResponse'
import MessageWorkers from './components/MessageWorkers'
import computeResponses from './utils/utils';

const App = () => {
  const [responses, setResponses] = useState([]);
  const [workers, setWorkers] = useState([]);

  const handleResponses = (msgData) => {
    //console.log("Handle Response ", msgData);
    if (msgData) {
      const reqId = msgData.requestIds.reverse();
      if (reqId) {
        const resp = msgData.responses[reqId];
        const worker = msgData.workers[resp.workerId];
        const { responseData, workerData } = computeResponses(resp, workers, worker)
        setResponses(_.concat(responses, responseData));
        setWorkers(workerData);
      }
    }
  };

  return (
    <div id="-body">
      <header id="-head">
        <h2>Hybrid Cloud</h2>
      </header>
      <div id="-body-content">
        <MessageRequest responseHandler={handleResponses} />
      </div>
      <Divider />
      <Flex>
        <FlexItem>
          <h2>Responses</h2>
          <MessageResponse responses={responses} />
        </FlexItem>
        <Divider isVertical />
        <FlexItem>
          <h2>Messages</h2>
          <MessageWorkers workers={workers} />
        </FlexItem>
      </Flex>
    </div>
  );
}

export default App;
