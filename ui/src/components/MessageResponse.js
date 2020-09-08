import React, { useEffect, useState } from "react";
import _ from 'lodash';

const MessageResponse = () => {

  const [responses, setResponses] = useState([]);

  useEffect(() => {
    console.log("Responses changed update chart")
  }, [responses]);

  return (
    <div>
      <p>Responses: {JSON.stringify(responses)}</p>
    </div>
  );
}

export default MessageResponse;