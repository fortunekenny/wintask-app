import styled from "styled-components";

const ProgressBar = ({ remainderTime, remainingTime }) => {
  let percent = Math.floor(
    ((remainingTime - remainderTime) / remainingTime) * 100
  );
  let bgColor =
    percent <= 25
      ? `linear-gradient(90deg, #57a9d9 0%, #8b57d9 100%)`
      : percent > 25 && percent <= 50
      ? `linear-gradient(90deg, #57a9d9 0%, #8b57d9 50%, #57D9B2 100%)`
      : percent > 50 && percent < 75
      ? `linear-gradient(90deg, #57a9d9 0%, #8b57d9 25%, #57d9b2 50%, #57d95b 100%,)`
      : percent > 75 && percent <= 100
      ? `linear-gradient(90deg, #57a9d9 0%, #8b57d9 25%, #57D9B2 50%,#57d95b 75%, #d95b57 100% )`
      : `linear-gradient(90deg, skyblue)`;

  return (
    <Wrapper>
      <h4>{percent}%</h4>
      <div className="container">
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              transform: `translateX(${percent - 100}%)`,
              // width: `${percent}%`,
              backgroundImage: bgColor,
            }}
          ></div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
  .container {
    width: 300px;
    height: 30px;
  }
  .progress-bar {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-color: #e6e6e6;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    border-radius: 15px;
    width: 100%;
    transition: all 0.5s ease-in-out;
  }

  h4 {
    /* text-align: center; */
    /* padding-top: 9px; */
  }
`;

export default ProgressBar;
