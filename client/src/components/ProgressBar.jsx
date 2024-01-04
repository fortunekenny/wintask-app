import styled from "styled-components";

const ProgressBar = ({ remainderTime, remainingTime }) => {
  let percent = Math.floor(
    ((remainingTime - remainderTime) / remainingTime) * 100
  );
  // let bgColor =
  //   percent <= 25
  //     ? `linear-gradient(90deg, #57a9d9 0%, #8b57d9 50%)`
  //     : percent > 25 && percent <= 50
  //     ? `linear-gradient(90deg, #57a9d9 0%, #8b57d9 50%, #57D9B2 100%)`
  //     : percent > 50 && percent < 75
  //     ? `linear-gradient(90deg, #57a9d9 0%, #8b57d9 25%, #57d9b2 50%, #57d95b 100%,)`
  //     : percent > 75 && percent <= 100
  //     ? `linear-gradient(90deg, #57a9d9 0%, #8b57d9 25%, #57D9B2 50%,#57d95b 75%, #d95b57 100% )`
  //     : `linear-gradient(90deg, skyblue)`;

  return (
    <Wrapper>
      <h4>{percent}%</h4>
      <div className="container">
        <svg height="30" width="500">
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
            x1="10"
            y1="15"
            x2="300"
            y2="15"
            stroke="grey"
            // strokeLinecap="round"
            // strokeWidth="17"
          />
          <line
            x1="10"
            y1="15"
            x2={percent * 3}
            y2="15"
            stroke="url(#e)"
            // strokeLinecap="round"
            // strokeWidth="15"
          />
        </svg>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
  svg {
    /* background: purple; */
  }
  line {
    stroke-linecap: round;
    stroke-width: 17;
    transition: all 0.5s ease-in-out;
  }
`;

export default ProgressBar;
