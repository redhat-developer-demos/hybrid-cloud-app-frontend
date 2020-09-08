import React, { useState, useEffect } from 'react';
import _ from 'lodash';

//Application 
import './App.css';
import MessageRequest from './components/MessageRequest'
import MessageResponse from './components/MessageResponse'
import MessageWorkers from './components/MessageWorkers'
import computeResponses from './utils/utils';

const App = () => {
  const [msgData, setMessageData] = useState(null)
  const [responses, setResponses] = useState([]);
  const [workers, setWorkers] = useState([]);

  const handleResponses = () => {
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

  const handleErrors = (ev) => {
    if (ev && ev.data) {
      console.log("Error with Source", ev.data);
    }
  }

  useEffect(() => {
    const msgEvents = new EventSource("http://localhost:8080/api/data");
    msgEvents.onmessage = (ev) => {
      if (ev.data) {
        setMessageData(JSON.parse(ev.data));
      } else {
        setMessageData(null)
      }
    };
    msgEvents.onerror = (ev) => handleErrors(ev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleResponses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgData]);

  return (
    <div id="-body">
      <header id="-head">
        <h2>Hybrid Cloud</h2>
      </header>
      <br />
      <div id="-body-content">
        <MessageRequest />
        <h2>Responses</h2>
        <MessageResponse responses={responses} />
        <h2>Workers</h2>
        <MessageWorkers workers={workers} />
      </div>
    </div>
  );
}

export default App;
