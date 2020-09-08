import _ from 'lodash';

function computeResponses (resp, workers, worker) {
  let workerData = workers ? _.slice(workers) : [];
  //console.log("WorkerData", workerData);
  let responseData = { [resp.cloudId]: { text: resp.text } };
  let wIdx = _.findIndex(workers, { [worker.cloud]: {} })
  let w;
  if (wIdx === -1) {
    //console.log("Cloud not found add count")
    w = {
      [worker.cloud]: {
        requestsProcessed: worker.requestsProcessed,
        requestErrors: worker.requestErrors ? worker.requestErrors : 0,
      }
    }
    workerData = _.concat(workers, w);
  } else {
    const cw = _.nth(workers, wIdx)[worker.cloud];
    const rProcessed = worker.requestsProcessed + cw.requestsProcessed;
    const rErrors = worker.requestErrors ? worker.requestErrors : 0;
    w = {
      [worker.cloud]: {
        requestsProcessed: rProcessed,
        requestErrors: rErrors + cw.requestErrors,
      }
    }
    workerData[wIdx] = w;
    //console.log("Cloud found update count", JSON.stringify(workerData))
  }
  return {
    responseData, workerData
  }
}

export default computeResponses;