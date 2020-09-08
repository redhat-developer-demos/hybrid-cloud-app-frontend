import React from 'react';
import _ from 'lodash';

//Application 
import './App.css';
import MessageRequest from './components/MessageRequest'
import MessageResponse from './components/MessageResponse'
import MessageWorkers from './components/MessageWorkers'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      responses: [],
      workers: [],
    }
    this.handleResponses = this.handleResponses.bind(this);
    this.handleErrors = this.handleErrors.bind(this);

    const msgEvents = new EventSource("http://localhost:8080/api/data");

    msgEvents.onmessage = this.handleResponses
    msgEvents.onerror = this.handleErrors
  }

  handleResponses (ev) {
    if (ev.data) {
      const rm = JSON.parse(ev.data);
      if (rm) {
        const reqId = rm.requestIds.reverse();
        if (reqId) {
          const resp = rm.responses[reqId];
          //console.log(resp);
          //console.log(rm.workers);
          this.computeResponses(resp, rm.workers[resp.workerId])
        }
      }
    }
  }

  handleErrors (es, ev) {
    console.log("Error:" + ev);
  }

  computeResponses (resp, worker) {
    //console.log("Response:", resp)
    //console.log("Worker:", worker)

    //Responses
    let responses = this.state.responses;
    let workers = this.state.workers;

    var res = { [resp.cloudId]: { text: resp.text } };

    //Workers
    console.log("E Workers ", workers);

    let wIdx = _.findIndex(workers, { [worker.cloud]: {} })

    console.log("E Workers wIdx ", wIdx);

    let w;
    if (wIdx === -1) {
      console.log("Cloud not found add count")
      w = {
        [worker.cloud]: {
          requestsProcessed: worker.requestsProcessed,
          requestErrors: worker.requestErrors ? worker.requestErrors : 0,
        }
      }
    } else {
      console.log("Cloud  found update count")
    }

    this.setState({ responses: _.concat(responses, res) });
    this.setState({ workers: _.concat(workers, w) });
  }

  render () {

    return (
      <div id="-body">
        <header id="-head">
          <h2>Hybrid Cloud</h2>
        </header>
        <br />
        <div id="-body-content">
          <MessageRequest />
          <h2>Responses</h2>
          <MessageResponse responses={this.state.responses} />
          <h2>Workers</h2>
          <MessageWorkers workers={this.state.workers} />
        </div>
      </div>
    );
  }
}

export default App;
