import React from "react";
import ResponsesTable from './ResponsesTable';

const MessageResponse = ({ responses }) => {


  const buildRows = (res) => {
    //console.log("Responses:", JSON.stringify(res))
    if (res && res.length > 0) {
      const rowData = [];
      res.forEach(object => {
        const row = [];
        for (const [key, value] of Object.entries(object)) {
          //console.log(`${key}: ${value['text']}`);
          row.push(value['text']);
          row.push(key);
        }
        rowData.push({ cells: row })
      });
      //console.log("Table Rows", JSON.stringify(rowData))
      return rowData;
    }
    return [];

  }
  return (
    <ResponsesTable rows={buildRows(responses)} />
  );
}

export default MessageResponse;