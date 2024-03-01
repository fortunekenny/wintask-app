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
        <div className="createrepeat">
          <p className="para">
            <span className="colour">
              {repeat ? "Repeated" : "Created"} At:{" "}
            </span>
            <span className="size">{updatedTime}</span>
            <span className="colour">
              {" "}
              {yesterday
                ? "yesterday"
                : today
                ? "today"
                : `${expiredDays} ${daysPlural} ago`}
            </span>
          </p>
        </div>
        <div className="cancelexpire">
          <p className="para">
            <span className="colour">
              {remainderTime < 1 && !cancel
                ? "Expired "
                : remainderTime < 1 && cancel
                ? "Cancelled "
                : "Expires "}
              At:{" "}
            </span>
            <span className="size">{cancel ? CancelledTime : expiresAt}</span>
            <span className="colour">
              {" "}
              {tomorrow
                ? "tomorrow"
                : yesterday
                ? "yesterday"
                : today
                ? "today"
                : `${expiredDays} ${daysPlural} ago`}
            </span>
          </p>
        </div>
        <div>
          <p className="count">
            <span className="colour size">
              Repeat Count: <span>{repeatCount} </span>
            </span>
            <span className="colour size">
              Edit Count: <span>{editCount}</span>
            </span>
            <span className="colour size">
              Cancel Count: <span>{cancelCount}</span>
            </span>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminTaskInfo;

const Wrapper = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
  .info-center {
    display: grid;
    justify-items: center;
  }
  p {
    margin-bottom: 0px;
  }
  .para {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    font-size: 0.8rem;
  }
  .size {
    font-size: 0.8rem;
    font-weight: 600;
  }
  .colour {
    color: var(--mediumVariation);
  }
  .createrepeat,
  .cancelexpire {
    margin: auto;
  }

  ///// COUNT SECTION //////

  .count {
    display: grid;
    grid-template-columns: fit-content(30%) fit-content(22%) fit-content(30%);
    justify-content: space-evenly;
    justify-items: center;
    align-items: center;
  }
`;
