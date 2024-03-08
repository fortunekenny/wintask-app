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
            <span className="size"> {updatedTime}</span>
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
  width: 95%;
  .info-center {
    /* display: grid; */
    /* grid-template-columns: fit-content(100%); */
    /* width: 100%; */
    /* justify-items: center; */
    /* margin: auto; */
  }
  p {
    margin-bottom: 0px;
  }
  .para {
    display: grid;
    grid-template-columns: auto auto auto;
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
    /* width: 100%; */
    text-align: center;
    /* font-size: 0.2rem; */
  }
  .count span {
    font-size: 0.65rem;
  }
  .spacing {
    padding-right: 3%;
  }
  @media screen and (min-width: 350px) {
    .para {
      font-size: 0.9rem;
    }
    .size {
      font-size: 0.9rem;
    }
    .count span {
      font-size: 0.8rem;
    }
  }
  @media screen and (min-width: 676px) {
    width: 85%;
    .info-center {
      display: grid;
      grid-template-columns: max-content max-content;
      /* justify-items: center; */
      justify-content: space-between;
      /* width: 100%; */
      /* max-width: 100%; */
    }

    p {
      grid-column: 1 / 3;
    }
    .count span {
      font-size: 1rem;
    }
    .spacing {
      padding-right: 15%;
    }
  }
`;
