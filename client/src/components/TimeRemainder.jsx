import styled from "styled-components";
import remainingTimeConverter from "../utils/remainingTimeConverter";
const TimeRemainder = ({ remainderTime }) => {
  let { remainingHours, remainingMinutes, remainingSeconds } =
    remainingTimeConverter(remainderTime);

  return (
    <Wrapper>
      <div className="">
        <h4>
          {remainingHours < 10 ? `0${remainingHours}` : remainingHours}
          <span>{remainingHours <= 1 ? ` hr` : ` hrs`}</span>
        </h4>
        <h4>
          {remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes}
          <span>{remainingMinutes <= 1 ? ` min` : ` mins`}</span>
        </h4>
        <h4>
          {remainingSeconds < 10 ? `0${remainingSeconds} ` : remainingSeconds}
          <span>{remainingSeconds <= 1 ? ` sec` : ` secs`}</span>
        </h4>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default TimeRemainder;
