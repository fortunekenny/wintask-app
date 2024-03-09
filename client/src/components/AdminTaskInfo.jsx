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
          <p className="unbold">{repeat ? "Repeated" : "Created"} At: </p>
          <span className="bold"> {updatedTime}</span>
          <p className="unbold">
            {yesterday
              ? "yesterday"
              : today
              ? "today"
              : `${expiredDays} ${daysPlural} ago`}
          </p>
        </div>
        <div className="cancelexpire">
          <p className="unbold">
            {remainderTime < 1 && !cancel
              ? "Expired "
              : remainderTime < 1 && cancel
              ? "Cancelled "
              : "Expires "}
            At:{" "}
          </p>
          <span className="bold">{cancel ? CancelledTime : expiresAt}</span>
          <p className="unbold">
            {" "}
            {tomorrow
              ? "tomorrow"
              : yesterday
              ? "yesterday"
              : today
              ? "today"
              : `${expiredDays} ${daysPlural} ago`}
          </p>
        </div>
      </div>
      <div className="count">
        <span className="">{editCount}</span>
        <p className="">Edit Count</p>
        <span className="">{cancelCount}</span>
        <p className="">Cancel Count</p>
        <span className="">{repeatCount}</span>
        <p className="">Repeat Count</p>
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
  width: 95%;
  .info-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-evenly;
    justify-items: center;
    align-items: center;
    margin: auto;
  }
  .createrepeat,
  .cancelexpire {
    display: grid;
    grid-template-rows: auto auto auto;
    grid-auto-flow: column;
  }
  p {
    margin-bottom: 0px;
  }
  .bold {
    font-size: 0.8rem;
    font-weight: 600;
  }
  .unbold {
    color: var(--mediumVariation);
    font-size: 0.8rem;
  }

  ///// COUNT SECTION //////
  .count {
    display: grid;
    grid-template-rows: auto auto;
    grid-auto-flow: column;
    justify-items: center;
    margin-top: 0.5rem;
  }
  .count p {
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--mediumVariation);
  }
  .count span {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 675px) {
    .info-center {
      width: 85%;
      /* min-width: 183px; */
    }
    .count {
      width: 70%;
      /* min-width: 183px; */
      margin: auto;
      margin-top: 0.5rem;
    }
  }

  @media screen and (min-width: 676px) {
    width: 85%;
    .info-center {
      width: 85%;
    }

    .bold {
      font-size: 1rem;
    }
    .unbold {
      font-size: 1rem;
    }
    .count {
      width: 80%;
      margin: auto;
      margin-top: 0.5rem;
    }
    .count p {
      font-size: 1rem;
    }
    .count span {
      font-size: 1.75rem;
    }
  }
`;
