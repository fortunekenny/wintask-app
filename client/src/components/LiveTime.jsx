import { useState, useEffect } from "react";
import { styled } from "styled-components";

const LiveTime = () => {
  let [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <Wrapper>
      <div className="time-center">
        <h1>{date.toLocaleTimeString()}</h1>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .time-center {
    /* display: inline-block; */
    /* border: 1px solid red; */
    margin: 2rem auto;
    /* margin-top: 2rem; */
    /* margin-bottom: 2rem; */
    text-align: center;
  }
  .time-center h1 {
    display: inline-block;
    background: var(--white);
    border: 2px solid var(--lightVariation);
    border-radius: 1rem;
    margin: auto;
    padding: 1rem 1rem;
    /*  */
  }
  @media screen and (min-width: 676px) {
    .time-center h1 {
      letter-spacing: 5px;
    }
  }
`;
export default LiveTime;
