import React, { useState, useEffect } from "react";
import axios from 'axios';

import CloudMessagesChart from './CloudMessagesChart'

const MessageWorkers = () => {
  const [workers, setWorkers] = useState([]);

  const chartData = () => {
    //console.log("Workers", JSON.stringify(workers))
    const data = [];
    const legendData = [];
    let title = 0;
    if (workers && workers.length > 0) {
      workers.forEach(object => {
        const cloud = object[0]
        const rp = object[1];
        //console.log(`${cloud}: ${rp}`);
        title += rp;
        data.push({ x: cloud, y: rp })
        legendData.push({ name: `${cloud}: ${rp}` });
      });
      const chartData = { data, legendData, title }
      //console.log("Rows", JSON.stringify(chartData))
      return chartData;
    }

    return { data: [], legendData: [], title };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(process.env.REACT_APP_API_WORKER_URL)
        .then(function (response) {
          if (response.status === 200) {
            if (response.data) {
              setWorkers(response.data);
            } else {
              console.log("No worker data data in response");
            }
          }
        })
        .catch(function (error) {
          console.log("Error getting worker data", error);
        });

    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <React.Fragment>
      <CloudMessagesChart workerData={chartData()} />
    </React.Fragment>
  );
}

export default MessageWorkers;