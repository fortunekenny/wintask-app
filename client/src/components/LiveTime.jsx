import { useState, useEffect } from "react";

const LiveTime = () => {
  let [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <div>
      <h1>{date.toLocaleTimeString()}</h1>
    </div>
  );
};

export default LiveTime;
