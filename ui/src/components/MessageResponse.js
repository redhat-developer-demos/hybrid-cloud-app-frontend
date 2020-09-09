import React, { useState, useEffect } from "react";
import axios from 'axios';

import ResponsesTable from './ResponsesTable';

const MessageResponse = () => {

  const [responses, setResponses] = useState([]);

  const buildRows = () => {
    //console.log("Responses:", JSON.stringify(responses))
    if (responses && responses.length > 0) {
      const rowData = [];
      responses.forEach(object => {
        const row = [];
        const cloud = object['cloud'];
        const response = object['response'];
        //console.log(`${cloud}: ${response}`);
        row.push(response);
        row.push(cloud);
        rowData.push({ cells: row })
      });
      //console.log("Table Rows", JSON.stringify(rowData))
      return rowData;
    }
    return [];

  }

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(process.env.REACT_APP_API_RESPONSES_URL)
        .then(function (response) {
          if (response.status === 200) {
            if (response.data) {
              setResponses(response.data);
            } else {
              console.log("No responses data data in response");
            }
          }
        })
        .catch(function (error) {
          console.log("Error getting responses data", error);
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <ResponsesTable rows={buildRows()} />
  );
}

export default MessageResponse;