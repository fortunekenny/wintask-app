import styled from "styled-components";
import { Link, Form } from "react-router-dom";
import { BsRepeat1 } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { RiEditCircleLine } from "react-icons/ri";
import { RiDeleteBin2Line } from "react-icons/ri";

const ButtonsComponent = ({ remainderTime, _id, showButton }) => {
  return (
    <Wrapper>
      <div className={showButton ? "button-center" : "hide-button"}>
        <Form method="post" action={`./repeattask/${_id}`}>
          <button
            type="submit"
            disabled={remainderTime > 1}
            className={remainderTime > 1 ? "disable" : "btn2"}
          >
            <BsRepeat1 />
            <p>Repeat</p>
          </button>
        </Form>
        <Form method="post" action={`./canceltask/${_id}`}>
          <button
            type="submit"
            disabled={remainderTime < 1}
            className={remainderTime < 1 ? "disable" : "btn2"}
          >
            <MdOutlineCancel />
            <p>Cancel</p>
          </button>
        </Form>
        <Link to={`./edittask/${_id}`}>
          <button
            type="button"
            disabled={remainderTime > 1}
            className={remainderTime > 1 ? "disable" : "btn2"}
          >
            <RiEditCircleLine />
            <p>Edit</p>
          </button>
        </Link>
        <Form method="post" action={`./deletetask/${_id}`}>
          <button type="submit" className="btn2">
            <RiDeleteBin2Line />
            <p>Delete</p>
          </button>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* background: skyblue; */
  .button-center {
    /* border: 1px solid red; */
    display: flex;
    padding: 0.5rem 0;
    /* flex-direction: column; */
    justify-content: center;
    /* background: var(--lightestVariation); */
    border-radius: 2rem;
  }
  .btn2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    background: transparent;
    border: transparent;
    border-radius: var(--borderRadius);
    /* padding: 0.375rem 0.75rem; */
    /* box-shadow: var(--shadowSM); */
    transition: var(--transition);
    text-transform: capitalize;
    /* text-align: center; */
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
    /* text-align: center; */
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
    /* padding: 0.375rem 0.75rem; */
    /* box-shadow: var(--shadowSM); */
    text-transform: capitalize;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    /* display: inline-block; */
  }
  .disable p {
    margin-bottom: 0.1rem;
    font-size: 0.65rem;
    /* text-align: center; */
  }
  .disable svg {
    font-size: 1.5rem;
  }
  .hide-button {
    display: none;
  }
  /* @media screen and (max-width: 400px) {
    .btn {
      margin-right: 0.5rem;
    }
    .disable {
      margin-right: 0.5rem;
    }
  } */
`;

export default ButtonsComponent;
