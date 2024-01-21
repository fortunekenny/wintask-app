import styled from "styled-components";
import { useState, useEffect } from "react";
import { TimeRemainder, InfoComponent, ButtonsComponent } from "../components";
import ProgressBar from "./ProgressBar";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { CiMenuKebab } from "react-icons/ci";
import isTomorrow from "dayjs/plugin/isTomorrow";
import isYesterday from "dayjs/plugin/isYesterday";
import isToday from "dayjs/plugin/isToday";
import duration from "dayjs/plugin/duration";
day.extend(isYesterday);
day.extend(isTomorrow);
day.extend(isToday);
day.extend(duration);
day.extend(advancedFormat);

const SingleTask = ({
  cancel,
  remainingTime,
  repeat,
  title,
  _id,
  futureTimeInNumber,
  previouseFutureTime,
  lastTimeUpdated,
  futureTime,
  lastTimeUpdatedBeforeCanceling,
  updatedAt,
  futureTimeMonth,
  futureTimeYear,
}) => {
  let [remainderTime, setRemainderTime] = useState(remainingTime);
  let [info, setInfo] = useState(false);
  let [showButton, setShowButton] = useState(false);
  let timeNow = new Date();
  futureTime = new Date(futureTime);
  // console.log(futureTime, timeNow);

  useEffect(() => {
    let remainder = setInterval(() => {
      setRemainderTime(() => {
        let remainingTimeCount = futureTime - timeNow;
        if (remainingTimeCount < 1000) {
          clearInterval(remainder);
          let hour = 0;
          return hour;
        }
        return remainingTimeCount;
      });
    }, 1000);
    return () => clearInterval(remainder);
  }, [futureTime, timeNow]);

  let expiresAt = day(futureTime).format("hh:mm:ss A");
  let updatedTime =
    repeat || cancel
      ? day(lastTimeUpdatedBeforeCanceling).format("hh:mm:ss A")
      : day(updatedAt).format("hh:mm:ss A");

  let yesterday = day(futureTime).isYesterday();
  let today = day(futureTime).isToday();
  let tomorrow = day(futureTime).isTomorrow();
  let dur = day.duration(day(timeNow).diff(futureTime));

  // console.log(dur.$d.days);

  let data = {
    cancel,
    remainingTime,
    repeat,
    title,
    _id,
    futureTime,
    futureTimeMonth,
    futureTimeYear,
    lastTimeUpdatedBeforeCanceling,
    updatedAt,
    remainderTime,
    expiresAt,
    updatedTime,
    timeNow,
    yesterday,
    today,
    tomorrow,
    dur,
    info,
    setInfo,
    showButton,
    setShowButton,
  };

  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <div className="single-task-center">
        {/* <h4>task page</h4> */}
        <div className="title">
          <h4 className="task-title">{title}</h4>
          <button className="info-btn" onClick={() => setInfo(!info)}>
            <CiMenuKebab />
          </button>
        </div>
        {/* <hr /> */}
        <div className="feature-center">
          <div className="tim-but">
            <TimeRemainder {...data} />
            <ButtonsComponent {...data} />
          </div>
          <div className="">
            <ProgressBar {...data} />
          </div>
          <InfoComponent {...data} />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* background: skyblue; */
  /* width: 100%; */
  margin: auto;
  .single-task-center {
    /* border: 1px solid red; */
    /* display: inline-block; */
    background: var(--white);
    /* border: 2px solid var(--lightVariation); */
    border: transparent;
    border-radius: 0.5rem;
    margin: auto;
    margin-bottom: 2.5rem;
    padding: 1rem;
    padding-top: 0;
    box-shadow: var(--shadowSM);
    width: 100%;
    /* position: relative; */
    /*  */
  }
  .single-task-center:hover {
    box-shadow: var(--shadowXLG);
  }
  .title {
    display: flex;
    justify-content: space-between;
  }
  .title button {
    cursor: pointer;
    border: transparent;
    background: transparent;
    font-size: 1.2rem;
    margin: auto 0.5rem;
    /* border-radius: 50%; */
  }
  .task-title {
    background: var(--white);
    margin: auto;
    padding: 0 0.5rem;
    padding-top: 0.5rem;
    padding-left: 2rem;
    font-weight: 400;
    text-transform: capitalize;
    /* letter-spacing: 0.2rem; */
  }
  .feature-center {
    /* border: 2px solid var(--lightVariation); */
    border: transparent;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    position: relative;
  }

  @media screen and (min-width: 676px) {
    .single-task-center {
      width: 70%;
      max-width: 600px;
      margin: 2rem auto;
      box-shadow: var(--shadowSM);
    }
    .task-title {
      /* letter-spacing: 0.5rem; */
      font-size: 1.953rem;
    }
  }
`;

export default SingleTask;
