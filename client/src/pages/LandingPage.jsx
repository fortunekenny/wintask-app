import { Link, Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import LiveTime from "../components/LiveTime";

const LandingPage = () => {
  let [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    // timer = timer;
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <Wrapper>
      <div>
        <h1>WinTask</h1>
        <LiveTime />
      </div>
      <div>
        <Link to="/signup" className="">
          Register
        </Link>
        <Link to="/signin" className="">
          Sign In / Guest
        </Link>
      </div>
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default LandingPage;
