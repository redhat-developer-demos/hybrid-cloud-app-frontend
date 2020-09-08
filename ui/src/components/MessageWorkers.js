import React from "react";
import CloudMessagesChart from './CloudMessagesChart'

const MessageWorkers = (workers) => {

  const chartData = (workers) => {
    //TODO
    return workers;
  }

  return (
    <div>
      <p>Clouds: {JSON.stringify(workers)}</p>
      <CloudMessagesChart workers={chartData} />
    </div>
  );
}

export default MessageWorkers;