import { Link, Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import LiveTime from "../components/LiveTime";
import hero from "../assets/images/hero.svg";
import hero2 from "../assets/images/hero2.svg";

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
      <div className="landing-center">
        {/* <div className="landing-display"> */}
        <h1 className="landing-text">WinTask</h1>
        <LiveTime />
        {/* </div> */}
        <div className="links">
          <Link to="/signup" className="btn btn-landing">
            Register
          </Link>
          <Link to="/signin" className="btn btn-landing">
            Sign In / Guest
          </Link>
        </div>
      </div>
      <div className="img-center">
        <img src={hero} alt="hero image" />
      </div>
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background: var(--lightestVariation);
  /* background: url(${hero}); */
  width: 100vw;
  height: 100vh;
  .landing-center {
    /* border: 1px solid red; */
    background: var(--white);
    width: 90%;
    max-width: 500px;
    border-radius: 1rem;
    padding-bottom: 2rem;
  }
  .landing-text {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 0;
    color: var(--primaryColor);
  }
  .links {
    display: flex;
    justify-content: space-around;
    width: 50%;
    max-width: 225px;
    min-width: 225px;
    margin: auto;
    margin-bottom: 1rem;
    font-family: var();
  }
  .btn-landing {
    letter-spacing: 0;
  }
  .img-center {
    display: none;
  }
  /*  mobile max 414 */
  /* tablet min 601 */
  /* tablet max 1024 */
  /* pc min 1170 */
  @media screen and (min-width: 1170px) {
    .img-center {
      display: block;
    }
    .img-center img {
      width: 80%;
    }
  }
`;

export default LandingPage;
