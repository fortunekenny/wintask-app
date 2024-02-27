import { Form } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";
import styled from "styled-components";

const DeleteButton = ({ actionstring, classes }) => {
  return (
    <Wrapper>
      <Form method="post" action={actionstring} className={classes}>
        <button type="submit" className="btn2">
          <RiDeleteBin2Line />
          <p>Delete</p>
        </button>
      </Form>
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

export default DeleteButton;
