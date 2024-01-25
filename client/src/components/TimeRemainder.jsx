import styled from "styled-components";
import remainingTimeConverter from "../utils/remainingTimeConverter";
const TimeRemainder = ({
  remainderTime,
  futureTimeMonth,
  futureTimeYear,
  showButton,
  setShowButton,
}) => {
  remainderTime = remainderTime < 0 ? 0 : remainderTime;

  let { remainingHours, remainingMinutes, remainingSeconds } =
    remainingTimeConverter(remainderTime, futureTimeMonth, futureTimeYear);

  return (
    <Wrapper>
      <div
        className="time-remainder"
        onClick={() => setShowButton(!showButton)}
      >
        <h4 className={remainderTime === 0 ? "hides" : "shows"}>remaining:</h4>
        <div className="time-texts">
          <h2>
            {remainingHours < 10 ? `0${remainingHours}` : remainingHours}
            <span>{remainingHours <= 1 ? ` hr` : ` hrs`}</span>
          </h2>
          <h2>
            {remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes}
            <span>{remainingMinutes <= 1 ? ` min` : ` mins`}</span>
          </h2>
          <h2>
            {remainingSeconds < 10 ? `0${remainingSeconds} ` : remainingSeconds}
            <span>{remainingSeconds <= 1 ? ` sec` : ` secs`}</span>
          </h2>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 0.5rem;
  position: relative;
  .time-remainder {
    cursor: pointer;
    width: 90%;
    margin: 0 auto;
  }
  .time-texts {
    display: flex;
    flex: 0 0 0;
    justify-content: center;
  }
  .time-texts:active {
    background: var(--darkestVariation);
  }
  .time-texts:active h2 {
    color: var(--lightestVariation);
  }
  h2 {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 0.5rem;
  }
  h2 span {
    font-size: var(--smallText);
    font-weight: 400;
    color: var(--mediumVariation);
  }
  .shows {
    /* border: 1px solid red; */
    visibility: visible;
    position: absolute;
    top: 0;
    left: 1%;
    font-size: 0.95rem;
    color: var(--mediumVariation);
    font-weight: 400;
    transition: var(--transition);
    margin-bottom: 0;
  }
  .hides {
    display: none;
  }
`;

export default TimeRemainder;
