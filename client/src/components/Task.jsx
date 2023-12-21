import styled from "styled-components";
import { Form, Link, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { TimeRemainder, InfoComponent, ButtonsComponent } from "../components";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Task = (task) => {
  let {
    cancel,
    remainingTime,
    repeat,
    title,
    _id,
    futureTime,
    lastTimeUpdatedBeforeCanceling,
    updatedAt,
  } = task;
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

  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <div className="">
        <h4>task page</h4>
        <div className="">
          <h5>{title}</h5>
          <TimeRemainder task={task} />
        </div>
        <div className="">
          <h5>remaining time loader bar</h5>
        </div>
        <div className="">
          <InfoComponent task={task} />
        </div>
        <div className="">
          <ButtonsComponent task={task} />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default Task;
