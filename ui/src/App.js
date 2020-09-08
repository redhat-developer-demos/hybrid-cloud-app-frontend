import React, { useState } from 'react';
import { Divider, Flex, FlexItem, Title, TitleSizes } from '@patternfly/react-core';
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
    <React.Fragment>
      <Title headingLevel="h1" size={TitleSizes['4xl']}>
        Hybrid Cloud Demo
      </Title>
      <Divider />
      <div id="-body-content">
        <MessageRequest responseHandler={handleResponses} />
      </div>
      <Divider />
      <Flex spaceItems={{ modifier: 'spaceItemsXl' }}>
        <FlexItem flex={{ default: 'flex_2' }}>
          <Title headingLevel="h1" size={TitleSizes['2xl']}>
            Responses
          </Title>
          <MessageResponse responses={responses} />
        </FlexItem>
        <Divider isVertical />
        <FlexItem>
          <Title headingLevel="h1" size={TitleSizes['2xl']}>
            Messages
          </Title>
          <MessageWorkers workers={workers} />
        </FlexItem>
      </Flex>
    </React.Fragment>
  );
}

export default App;
