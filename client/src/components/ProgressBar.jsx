import styled from "styled-components";

const ProgressBar = ({ remainderTime, remainingTime, futureTime, timeNow }) => {
  let percent = Math.floor(
    ((remainingTime - remainderTime) / remainingTime) * 100
  );
  percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;
  // console.log("times", remainingTime, futureTime - timeNow, percent);
  // console.log("difs", remainingTime - (futureTime - timeNow));
  return (
    <Wrapper>
      <h4>{percent}%</h4>
      <div className="container">
        {/* <svg height="30" width="500"> */}
        <svg viewBox="-10 0 500 20">
          <defs>
            <linearGradient
              id="e"
              x1="40"
              y1="210"
              x2="460"
              y2="210"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="steelblue" offset="1%" />
              <stop stopColor="gold" offset="25%" />
              {/* <stop stopColor="steelblue" offset="55%" /> */}
              <stop stopColor="red" offset="75%" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="15"
            x2="480"
            y2="15"
            stroke="#ddd"
            // strokeLinecap="round"
            // strokeWidth="17"
          />
          <line
            x1="0"
            y1="15"
            x2={percent * 4.8}
            y2="15"
            stroke="#af3dcc"
            // stroke="url(#e)"
            // strokeLinecap="round"
            // strokeWidth="15"
          />

          <text
            x={`${480 * 0.25}px`}
            y="95%"
            textAnchor="middle"
            className={percent >= 1 ? "svgtext" : "svgtextvisibility"}
          >
            {percent <= 25 ? percent / 100 : 0.25}
          </text>
          <text
            x={`${480 * 0.5}px`}
            y="95%"
            textAnchor="middle"
            className={percent > 25 ? "svgtext" : "svgtextvisibility"}
          >
            {percent > 25 && percent < 50 ? percent / 100 : 0.5}
          </text>
          <text
            x={`${480 * 0.75}px`}
            y="95%"
            textAnchor="middle"
            className={percent > 50 ? "svgtext" : "svgtextvisibility"}
          >
            {percent > 50 && percent < 75 ? percent / 100 : 0.75}
          </text>
          <text
            x={`${480 * 1}px`}
            y="95%"
            textAnchor="end"
            className={percent > 75 ? "svgtext" : "svgtextvisibility"}
          >
            {percent > 75 && percent === 100 ? percent / 100 : 1}
          </text>
        </svg>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /*background: skyblue;*/
  /* background: yellow; */
  h4 {
    margin-bottom: 0%;
    position: absolute;
    top: 1%;
    right: 1%;
    font-size: 1.2rem;
    color: var(--lightVariation);
  }
  svg {
    /* background: purple; */
  }
  line {
    stroke-linecap: round;
    stroke-width: 10;
    transition: all 0.5s ease-in-out;
  }
  .svgtext {
    visibility: visible;
    font-size: 0.7em;
    color: #f9f5fa;
  }
  .svgtextvisibility {
    visibility: hidden;
  }
`;

export default ProgressBar;
