import React from "react";
import CloudMessagesChart from './CloudMessagesChart'

const MessageWorkers = ({ workers }) => {

  const chartData = (workers) => {
    //console.log("Workers", JSON.stringify(workers))
    const data = [];
    const legendData = [];
    let title = 0;
    if (workers && workers.length > 0) {
      workers.forEach(object => {
        for (const [key, value] of Object.entries(object)) {
          const rp = value['requestsProcessed'];
          //console.log(`${key}: ${rp}`);
          title += rp;
          data.push({ x: key, y: rp })
          legendData.push({ name: `${key}: ${rp}` });
        }
      });
      const chartData = { data, legendData, title }
      //console.log("Rows", JSON.stringify(chartData))
      return chartData;
    }

    return { data: [], legendData: [], title };
  }

  return (
    <div>
      <CloudMessagesChart workerData={chartData(workers)} />
    </div>
  );
}

export default MessageWorkers;