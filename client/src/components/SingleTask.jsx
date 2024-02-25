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
  ampm,
  cancelledAt,
}) => {
  let [remainderTime, setRemainderTime] = useState(remainingTime);
  let [info, setInfo] = useState(false);
  let [showButton, setShowButton] = useState(false);
  let timeNow = new Date();
  futureTime = new Date(futureTime);

  let dateNow = new Date().getHours() >= 12 ? "PM" : "AM";
  let currentTime = new Date();
  let timezoneOffset = currentTime.getTimezoneOffset();

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

  let expiresAt =
    Math.sign(timezoneOffset) === 1 ||
    (Math.sign(timezoneOffset) === 1 && ampm === "AM" && dateNow === "PM")
      ? day(futureTime) - timezoneOffset * 60000
      : Math.sign(timezoneOffset) === -1 ||
        (Math.sign(timezoneOffset) === -1 && ampm === "AM" && dateNow === "PM")
      ? day(futureTime) + timezoneOffset * 60000
      : day(futureTime);
  expiresAt = day(expiresAt).format("hh:mm:ss A");

  let updatedTime =
    repeat || cancel
      ? day(lastTimeUpdatedBeforeCanceling).format("hh:mm:ss A")
      : day(updatedAt).format("hh:mm:ss A");

  let yesterday = day(futureTime).isYesterday();
  let today = day(futureTime).isToday();
  let tomorrow = day(futureTime).isTomorrow();
  let dur = day.duration(day(timeNow).diff(futureTime));

  let CancelledTime = day(cancelledAt).format("hh:mm:ss A");
  const expiredDays = dur.$d.days;
  const daysPlural = expiredDays < 2 ? "day" : "days";

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
    expiredDays,
    info,
    setInfo,
    showButton,
    setShowButton,
    daysPlural,
    CancelledTime,
  };

  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <div className="single-task-center">
        <div className="title">
          <h4 className="task-title">{title}</h4>
          <button className="info-btn" onClick={() => setInfo(!info)}>
            <CiMenuKebab />
          </button>
        </div>
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
  width: 100%;
  margin: auto;
  .single-task-center {
    background: var(--white);
    border: transparent;
    border-radius: 0.5rem;
    margin: auto;
    margin-bottom: 2.5rem;
    padding: 1rem;
    padding-top: 0;
    box-shadow: var(--shadowSM);
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
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
    margin: auto 0.5rem;
  }
  .title button:hover {
    border-radius: 50%;
    border: 1px solid var(--primaryColor);
  }
  .task-title {
    background: var(--white);
    margin: auto;
    padding: 0 0.5rem;
    padding-top: 0.5rem;
    padding-left: 2rem;
    font-weight: 400;
    text-transform: capitalize;
  }
  .feature-center {
    border: transparent;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    position: relative;
  }
  @media screen and (max-width: 500px) {
    .single-task-center {
    }
  }
  @media screen and (min-width: 676px) {
    .single-task-center {
      max-width: 600px;
      margin: 2rem auto;
      box-shadow: var(--shadowSM);
    }
    .task-title {
      font-size: 1.953rem;
    }
  }
`;

export default SingleTask;
