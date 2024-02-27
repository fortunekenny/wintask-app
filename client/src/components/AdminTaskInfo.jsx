import styled from "styled-components";
styled;

const AdminTaskInfo = ({
  repeat,
  updatedTime,
  yesterday,
  today,
  expiredDays,
  daysPlural,
  remainderTime,
  cancel,
  CancelledTime,
  expiresAt,
  tomorrow,
  cancelCount,
  repeatCount,
  editCount,
}) => {
  return (
    <Wrapper>
      <div className="info-center">
        <div className="createreapet">
          <h5>
            <span>{repeat ? "Repeated" : "Created"} At:</span>
            {updatedTime}
          </h5>
          <span>
            {yesterday
              ? "yesterday"
              : today
              ? "today"
              : `${expiredDays} ${daysPlural} ago`}
          </span>
        </div>
        <div className="cancelexpire">
          <h5>
            <span>
              {remainderTime < 1 && !cancel
                ? "Expired "
                : remainderTime < 1 && cancel
                ? "Cancelled "
                : "Expires "}
              At:
            </span>
            {cancel ? CancelledTime : expiresAt}
          </h5>
          <span>
            {tomorrow
              ? "tomorrow"
              : yesterday
              ? "yesterday"
              : today
              ? "today"
              : `${expiredDays} ${daysPlural} ago`}
          </span>
          <h5>Repeat Count: {repeatCount}</h5>
          <h5>Edit Count: {editCount}</h5>
          <h5>Cancel Count: {cancelCount}</h5>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminTaskInfo;

const Wrapper = styled.div``;
