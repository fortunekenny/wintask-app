import { useState, useEffect } from "react";
import { styled } from "styled-components";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

const LiveTime = () => {
  let [time, setTime] = useState(new Date());
  let timeNow = day(time).format("hh:mm:ss A");

  useEffect(() => {
    let timer = setInterval(() => setTime(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <Wrapper>
      <div className="time-center">
        {/* <h1>{timeNow.toLocaleTimeString()}</h1> */}
        <h1>{timeNow}</h1>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 2rem 5%;
  .time-center {
    width: 100%;
    margin: auto;
    text-align: center;
  }
  .time-center h1 {
    display: inline-block;
    background: var(--white);
    border: 2px solid var(--lightVariation);
    border-radius: 1rem;
    margin: auto;
    padding: 1rem 1rem;
    letter-spacing: 5px;
  }
  @media screen and (max-width: 500px) {
    .time-center h1 {
      letter-spacing: 0.2rem;
      font-size: 230%;
    }
  }
`;
export default LiveTime;
