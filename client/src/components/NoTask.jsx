import { Link } from "react-router-dom";
import { styled } from "styled-components";

const NoTask = () => {
  return (
    <Wrapper>
      <h2>No task.</h2>
      <Link
        to='createtask'
        className='lnk'
      >
        +
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  /* align-items: center; */
  /* text-align: center; */
  width: 100%;
  margin: 2rem auto;
  .lnk {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    color: var(--lightestVariation);
    font-size: 1.8rem;
    border-radius: 50%;
    background: var(--primaryColor);
    box-shadow: var(--shadowLG);
  }
  h2 {
    margin-bottom: 0rem;
  }
`;

export default NoTask;
