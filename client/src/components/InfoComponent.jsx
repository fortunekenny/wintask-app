import styled from "styled-components";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const InfoComponent = (task) => {
  let {
    cancel,
    remainingTime,
    repeat,
    futureTime,
    lastTimeUpdatedBeforeCanceling,
    updatedAt,
  } = task.task;
  let [remainderTime, setRemainderTime] = useState(remainingTime);

  let expiresAt = day(futureTime).format("HH:mm:ss");
  updatedAt =
    repeat || cancel
      ? day(lastTimeUpdatedBeforeCanceling).format("HH:mm:ss")
      : day(updatedAt).format("HH:mm:ss");
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

  return (
    <Wrapper>
      <div className="">
        <h4>
          {repeat ? "Repeated" : "Created"} At: {updatedAt}
        </h4>
        <h4>
          {remainderTime < 1 && !cancel
            ? "Expired "
            : remainderTime < 1 && cancel
            ? "Cancelled "
            : "Expires "}
          At: {expiresAt}
        </h4>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default InfoComponent;
