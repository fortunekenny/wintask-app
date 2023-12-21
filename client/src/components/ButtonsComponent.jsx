import styled from "styled-components";
import { Link, Form, redirect } from "react-router-dom";
import { useState, useEffect } from "react";

const ButtonsComponent = (task) => {
  let {
    // cancel,
    remainingTime,
    // repeat,
    // title,
    _id,
    futureTime,
    // lastTimeUpdatedBeforeCanceling,
    // updatedAt,
  } = task.task;
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
  return (
    <Wrapper>
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
        <button type="button" disabled={remainderTime > 1}>
          Edit
        </button>
      </Link>
      <Form method="post" action={`./deletetask/${_id}`}>
        <button type="submit">Delete</button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default ButtonsComponent;
