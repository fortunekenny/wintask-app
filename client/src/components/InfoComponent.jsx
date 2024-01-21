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
  return (
    <Wrapper>
      <div className={info ? "center-info" : "hide-info"}>
        <div className="repeat">
          <h5>
            <span>{repeat ? "Repeated" : "Created"} At:</span>
            {updatedTime}
          </h5>
        </div>
        <div className="expire">
          <h5>
            <span>
              {remainderTime < 1 && !cancel
                ? "Expired "
                : remainderTime < 1 && cancel
                ? "Cancelled "
                : "Expires "}
              At:
            </span>
            {expiresAt}
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
  /* background: skyblue; */
  transition: 1s cubic-bezier(0, 0.33, 0.78, 0.51) all;
  .center-info {
    display: flex;
    justify-content: space-around;
    margin-top: 0;
    /* margin-bottom: 0; */
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
    /* margin-bottom: 0; */
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
    display: none;
  }
  @media screen and (max-width: 400px) {
    .center-info {
      display: none;
    }
  }
`;

export default InfoComponent;
