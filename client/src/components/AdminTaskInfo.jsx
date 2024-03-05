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
        {/* <div className="count"> */}
        <p className="count">
          <span className=" colour size spacing">
            Repeat Count: {repeatCount}
          </span>
          <span className="colour size spacing">Edit Count: {editCount}</span>
          <span className="colour size">Cancel Count: {cancelCount}</span>
        </p>
        {/* </div> */}
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
  width: 70%;
  .info-center {
    display: grid;
    /* grid-template-columns: max-content; */
    /* width: 100%; */
    /* justify-items: start; */
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
  .cancelexpire {
    margin-top: 5px;
  }

  ///// COUNT SECTION //////
  .count {
    margin-top: 10px;
    width: 100%;
  }
  .spacing {
    padding-right: 15%;
  }
  @media screen and (min-width: 676px) {
    width: 84%;
    .info-center {
      grid-template-columns: 1fr 1fr;
      justify-items: center;
    }

    p {
      grid-column: 1 / 3;
    }
    .count p {
      font-size: 1rem;
    }
    .spacing {
      padding-right: 15%;
    }
  }
`;
