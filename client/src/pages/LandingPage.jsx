import { Link, Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { useState, useEffect } from "react";

const LandingPage = () => {
  let [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <Wrapper>
      <div>
        <h1>WinTask</h1>
        <section>
          <h1>{date.toLocaleTimeString()}</h1>
        </section>
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
/** 
  const landingTime = () => {
    const timeNow = new Date();
    // console.log(timeNow);

    let hours = timeNow.getHours();
    let minutes = timeNow.getMinutes();
    let seconds = timeNow.getSeconds();
    let ampm = hours < 12 ? `am` : `pm`;
    let modulusHours = hours % 12;
    modulusHours = modulusHours === 0 ? 12 : modulusHours;

    hours = hours > 12 ? modulusHours : `${hours}`;
    hours = hours === 0 ? 12 : hours;

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    let time = `${hours}:${minutes}:${seconds} ${ampm}`;

    // console.log(time.toString());
    return time.toString();
  };
  landingTime();
  
 
*/
