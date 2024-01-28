import styled from "styled-components";
import { Link, Form } from "react-router-dom";
import { BsRepeat1 } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { RiEditCircleLine } from "react-icons/ri";
import { RiDeleteBin2Line } from "react-icons/ri";

const ButtonsComponent = ({ remainderTime, _id, showButton }) => {
  return (
    <Wrapper>
      <div className={showButton ? "button-center" : "reduce-height"}>
        <Form
          method="post"
          action={`./repeattask/${_id}`}
          className={showButton ? "show" : "hide"}
        >
          <button
            type="submit"
            disabled={remainderTime > 1}
            className={remainderTime > 1 ? "disable" : "btn2"}
          >
            <BsRepeat1 />
            <p>Repeat</p>
          </button>
        </Form>
        <Form
          method="post"
          action={`./canceltask/${_id}`}
          className={showButton ? "show" : "hide"}
        >
          <button
            type="submit"
            disabled={remainderTime < 1}
            className={remainderTime < 1 ? "disable" : "btn2"}
          >
            <MdOutlineCancel />
            <p>Cancel</p>
          </button>
        </Form>
        <Link to={`./edittask/${_id}`} className={showButton ? "show" : "hide"}>
          <button
            type="button"
            disabled={remainderTime > 1}
            className={remainderTime > 1 ? "disable" : "btn2"}
          >
            <RiEditCircleLine />
            <p>Edit</p>
          </button>
        </Link>
        <Form
          method="post"
          action={`./deletetask/${_id}`}
          className={showButton ? "show" : "hide"}
        >
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
  .button-center {
    display: flex;
    padding: 0.5rem 0;
    justify-content: center;
    border-radius: 2rem;
    transition: var(--transition);
  }
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
  .reduce-height {
    height: 0px;
    transition: var(--transition);
  }
  .show {
    display: inline-block;
  }
  .hide {
    display: none;
    transition: var(--transition);
  }
`;

export default ButtonsComponent;
