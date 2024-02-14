import styled from "styled-components";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const InfoComponent = ({
  repeat,
  cancel,
  updatedTime,
  remainderTime,
  expiresAt,
  yesterday,
  today,
  tomorrow,
  dur,
  info,
}) => {
  let CancelledTime = day().format("hh:mm:ss A");

  return (
    <Wrapper>
      <div className={info ? "center-info" : "hide-info"}>
        <div className={info ? "repeat" : "hide"}>
          <h5>
            <span>{repeat ? "Repeated" : "Created"} At:</span>
            {updatedTime}
          </h5>
        </div>
        <div className={info ? "expire" : "hide"}>
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
              : `${dur.$d.days} days ago`}
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  transition: var(--transition);
  .center-info {
    display: flex;
    justify-content: space-around;
    margin-top: 0;
    transition: var(--transition);
  }
  .center-info span {
    font-size: 1rem;
    font-weight: 400;
  }

  .expire {
    display: flex;
    align-items: end;
  }
  .expire span {
    color: var(--mediumVariation);
  }
  .repeat h5 {
    margin-bottom: 0;
    padding-top: 1.1rem;
    padding-bottom: 0.2rem;
    position: relative;
  }
  .expire h5 {
    margin-bottom: 0;
    padding-top: 1.1rem;
    padding-bottom: 0.2rem;
    position: relative;
    margin-right: 0.3rem;
  }
  .repeat h5 span {
    position: absolute;
    top: 2%;
    left: 0%;
    margin-bottom: 0;
    color: var(--mediumVariation);
  }
  .expire h5 span {
    position: absolute;
    top: 2%;
    left: 0%;
    margin-bottom: 0;
    color: var(--mediumVariation);
  }
  .hide-info {
    height: 0px;
    transition: var(--transition);
  }
  .hide {
    display: none;
    transition: var(--transition);
  }
`;

export default InfoComponent;
