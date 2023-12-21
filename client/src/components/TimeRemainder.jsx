import styled from "styled-components";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";

const TimeRemainder = (task) => {
  let { remainingTime, futureTime } = task.task;
  let [remainderTime, setRemainderTime] = useState(remainingTime);

  let timeNow = new Date();
  futureTime = new Date(futureTime);

  useEffect(() => {
    let remainder = setInterval(() => {
      setRemainderTime(() => {
        let remainingTimeCount = futureTime - timeNow;
        if (remainingTimeCount < 1) {
          clearInterval(remainder);
          let hour = 0;
          return hour;
        }
        redirect("/userpage");
        return remainingTimeCount;
      });
    }, 1000);
    return () => clearInterval(remainder);
  }, [futureTime, timeNow]);

  const remainingTimeCountDown = () => {
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let remainingHours = Math.floor(remainderTime / oneHour);
    let remainingMinutes = Math.floor((remainderTime % oneHour) / oneMinute);
    let remainingSeconds = Math.floor((remainderTime % oneMinute) / 1000);
    return { remainingHours, remainingMinutes, remainingSeconds };
  };

  let { remainingHours, remainingMinutes, remainingSeconds } =
    remainingTimeCountDown();
  return (
    <Wrapper>
      <div className="">
        <h4>
          {remainingHours < 10 ? `0${remainingHours}` : remainingHours}
          <span>{remainingHours <= 1 ? ` hr` : ` hrs`}</span>
        </h4>
        <h4>
          {remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes}
          <span>{remainingMinutes <= 1 ? ` min` : ` mins`}</span>
        </h4>
        <h4>
          {remainingSeconds < 10 ? `0${remainingSeconds} ` : remainingSeconds}
          <span>{remainingSeconds <= 1 ? ` sec` : ` secs`}</span>
        </h4>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default TimeRemainder;
