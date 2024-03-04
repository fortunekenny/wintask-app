import { styled } from "styled-components";
// import TimeRemainder from "./TimeRemainderNotUsed";
import CancelButton from "./CancelButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import RepeatButton from "./RepeatButton";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import TimeRemainderAdmin from "./TimeRemainder";
import { useState, useEffect } from "react";
import AdminTaskInfo from "./AdminTaskInfo";

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
  cancelledAt,
  ampm,
  cancelCount,
  repeatCount,
  editCount,
}) => {
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

  let yesterday = day(futureTime).isYesterday();
  let today = day(futureTime).isToday();
  let tomorrow = day(futureTime).isTomorrow();
  let dur = day.duration(day(timeNow).diff(futureTime));

  let CancelledTime = day(cancelledAt).format("hh:mm:ss A");
  const expiredDays = dur.$d.days;
  const daysPlural = expiredDays < 2 ? "day" : "days";

  remainderTime = remainderTime < 0 ? 0 : remainderTime;

  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <h5>{title}</h5>
      <TimeRemainderAdmin
        remainderTime={remainderTime}
        futureTimeMonth={futureTimeMonth}
        futureTimeYear={futureTimeYear}
        ampm={ampm}
      />
      <div className="admin-buttons">
        <RepeatButton
          time={remainderTime}
          actionstring={`./adminrepeattask/${_id}`}
        />
        <CancelButton
          time={remainderTime}
          actionstring={`./admincanceltask/${_id}`}
        />
        <EditButton
          time={remainderTime}
          actionstring={`./adminedittask/${_id}`}
        />
        <DeleteButton actionstring={`./admindeletetask/${_id}`} />
      </div>
      <AdminTaskInfo
        repeat={repeat}
        updatedTime={updatedTime}
        yesterday={yesterday}
        today={today}
        expiredDays={expiredDays}
        daysPlural={daysPlural}
        remainderTime={remainderTime}
        cancel={cancel}
        CancelledTime={CancelledTime}
        expiresAt={expiresAt}
        tomorrow={tomorrow}
        cancelCount={cancelCount}
        repeatCount={repeatCount}
        editCount={editCount}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  margin-top: 2px;
  margin-bottom: 2px;
  background: var(--lightestVariation);
  section {
    /* width: 80%; */
  }
  .time-remainder {
    width: 100%;
  }
  .time-texts {
    display: grid;
    grid-template-columns: max-content max-content max-content;
  }
  .time-texts h2 {
    /* font-size: 1rem;*/
  }
  .time-remainder > h4 {
    display: none;
  }

  .admin-buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
    margin: 10px auto;
  }
  h5 {
    margin-bottom: 0rem;
  }

  @media screen and (min-width: 502px) {
  }
  @media screen and (min-width: 676px) {
    .admin-buttons {
      /* background: blue; */
      width: 50%;
      height: 80%;
    }
    .admin-buttons div form button {
      /* background: yellow; */
      /* font-size: ; */
      width: 90%;
      height: 70%;
      margin-right: 0px;
    }
    .admin-buttons div form button svg {
      font-size: 2rem;
    }
    .admin-buttons div form button p {
      font-size: 1rem;
    }
    .admin-buttons div a button {
      display: block;
      width: 90%;
      height: 70%;
      margin-right: 0px;
    }
    .admin-buttons div a button svg {
      font-size: 2rem;
    }
    .admin-buttons div a button p {
      font-size: 1rem;
    }
  }
  @media screen and (min-width: 990px) {
  }
`;

export default AdminSingleUserTasks;
