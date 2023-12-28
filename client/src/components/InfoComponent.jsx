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
}) => {
  return (
    <Wrapper>
      <div className="">
        <h4>
          {repeat ? "Repeated" : "Created"} At: {updatedTime}
        </h4>
        <h4>
          {remainderTime < 1 && !cancel
            ? "Expired "
            : remainderTime < 1 && cancel
            ? "Cancelled "
            : "Expires "}
          At: {expiresAt}
        </h4>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default InfoComponent;
