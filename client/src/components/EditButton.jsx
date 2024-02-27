import { Link } from "react-router-dom";
import { RiEditCircleLine } from "react-icons/ri";
import styled from "styled-components";

const EditButton = ({ time, classes, actionstring }) => {
  return (
    <Wrapper>
      <Link to={actionstring} className={classes}>
        <button
          type="button"
          disabled={time > 1}
          className={time > 1 ? "disable" : "btn2"}
        >
          <RiEditCircleLine />
          <p>Edit</p>
        </button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .btn2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    background: transparent;
    border: transparent;
    border-radius: var(--borderRadius);
    transition: var(--transition);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    margin-right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    color: var(--primaryColor);
  }
  .btn2:active {
    color: var(--lightestVariation);
    background: var(--darkestVariation);
  }
  .btn2 p {
    margin-bottom: 0.1rem;
    font-size: 0.65rem;
  }
  .btn2 svg {
    font-size: 1.5rem;
  }
  .disable {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ddd;
    color: var(--primaryColor);
    cursor: pointer;
    border: transparent;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
  }
  .disable p {
    margin-bottom: 0.1rem;
    font-size: 0.65rem;
  }
  .disable svg {
    font-size: 1.5rem;
  }
  /*
  .show {
    display: inline-block;
  }
  .hide {
    display: none;
    transition: var(--transition);
  }*/
`;

export default EditButton;
