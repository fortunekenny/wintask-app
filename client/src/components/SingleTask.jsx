import styled from "styled-components";
import { redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { TimeRemainder, InfoComponent, ButtonsComponent } from "../components";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const SingleTask = ({
  cancel,
  remainingTime,
  repeat,
  title,
  _id,
  futureTime,
  lastTimeUpdatedBeforeCanceling,
  updatedAt,
}) => {
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

  let expiresAt = day(futureTime).format("HH:mm:ss");
  let updatedTime =
    repeat || cancel
      ? day(lastTimeUpdatedBeforeCanceling).format("HH:mm:ss")
      : day(updatedAt).format("HH:mm:ss");

  let data = {
    cancel,
    remainingTime,
    repeat,
    title,
    _id,
    futureTime,
    lastTimeUpdatedBeforeCanceling,
    updatedAt,
    remainderTime,
    expiresAt,
    updatedTime,
  };

  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <div className="">
        <h4>task page</h4>
        <h5>{title}</h5>
        <div className="">
          <TimeRemainder {...data} />
          <InfoComponent {...data} />
          <ButtonsComponent {...data} />
        </div>
        <div className="">
          <h5>remaining time loader bar</h5>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default SingleTask;
