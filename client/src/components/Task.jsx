import styled from "styled-components";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Task = ({
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

  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <div className="">
        <h4>task</h4>
        <div className="">
          <h5>{title}</h5>
          <div className="">
            <h4>
              {remainingHours < 10 ? `0${remainingHours}` : remainingHours}
              <span>{remainingHours <= 1 ? ` hr` : ` hrs`}</span>
            </h4>
            <h4>
              {remainingMinutes < 10
                ? `0${remainingMinutes}`
                : remainingMinutes}
              <span>{remainingMinutes <= 1 ? ` min` : ` mins`}</span>
            </h4>
            <h4>
              {remainingSeconds < 10
                ? `0${remainingSeconds} `
                : remainingSeconds}
              <span>{remainingSeconds <= 1 ? ` sec` : ` secs`}</span>
            </h4>
          </div>
        </div>
        <div className="">
          <h5>remaining time loader bar</h5>
        </div>
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
        <div className="">
          <Form method="post" action={`./repeattask/${_id}`}>
            <button type="submit" disabled={remainderTime > 1}>
              Repeat
            </button>
          </Form>
          <Form method="post" action={`./canceltask/${_id}`}>
            <button type="submit" disabled={remainderTime < 1}>
              Cancel
            </button>
          </Form>
          <Link to={`./edittask/${_id}`}>
            <button type="button">Edit</button>
          </Link>
        </div>
        <Form method="post" action={`./deletetask/${_id}`}>
          <button type="submit">Delete</button>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default Task;
