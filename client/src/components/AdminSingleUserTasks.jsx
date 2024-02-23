import { styled } from "styled-components";
import TimeRemainder from "./TimeRemainder";
import CancelButton from "./CancelButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
/*
import { useState, useEffect } from "react";
import InfoComponent from "./InfoComponent";
import ButtonsComponent from "./ButtonsComponent";
import ProgressBar from "./ProgressBar";
import isTomorrow from "dayjs/plugin/isTomorrow";
import isYesterday from "dayjs/plugin/isYesterday";
import isToday from "dayjs/plugin/isToday";
import duration from "dayjs/plugin/duration";
day.extend(isYesterday);
day.extend(isTomorrow);
day.extend(isToday);
day.extend(duration);
day.extend(advancedFormat);
*/
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { createContext, useContext, useState, useEffect } from "react";

/*export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/users/${params.id}`);
    return data;
  } catch (error) {
    console.log(error);
    return redirect("userpage");
  }
};*/

/*

*/
const AdminSingleUserTasks = ({
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
  // console.log(title);
  let [remainderTime, setRemainderTime] = useState(remainingTime);
  let timeNow = new Date();
  futureTime = new Date(futureTime);

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

  /*
  let yesterday = day(futureTime).isYesterday();
  let today = day(futureTime).isToday();
  let tomorrow = day(futureTime).isTomorrow();
  let dur = day.duration(day(timeNow).diff(futureTime));
  */
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
    // timeNow,
    // yesterday,
    // today,
    // tomorrow,
    // dur,
  };

  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      {/* <div className=""> */}
      {/* <h4>task page</h4> */}
      <h5>{title}</h5>
      <div className="">
        <TimeRemainder {...data} />
        {/* <InfoComponent {...data} /> */}
        {/* <ButtonsComponent {...data} /> */}
      </div>
      {/* <div className=""><ProgressBar {...data} /></div> */}
      {/* </div> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default AdminSingleUserTasks;
