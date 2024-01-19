import styled from "styled-components";
import { Link, Form } from "react-router-dom";

const ButtonsComponent = ({ remainderTime, _id }) => {
  return (
    <Wrapper>
      <div className="button-center">
        <Form method="post" action={`./repeattask/${_id}`}>
          <button
            type="submit"
            disabled={remainderTime > 1}
            className={remainderTime > 1 ? "disable" : "btn"}
          >
            Repeat
          </button>
        </Form>
        <Form method="post" action={`./canceltask/${_id}`}>
          <button
            type="submit"
            disabled={remainderTime < 1}
            className={remainderTime < 1 ? "disable" : "btn"}
          >
            Cancel
          </button>
        </Form>
        <Link to={`./edittask/${_id}`}>
          <button
            type="button"
            disabled={remainderTime > 1}
            className={remainderTime > 1 ? "disable" : "btn"}
          >
            Edit
          </button>
        </Link>
        <Form method="post" action={`./deletetask/${_id}`}>
          <button type="submit" className="btn">
            Delete
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
    padding: 0.5rem;
    justify-content: center;
    /* background: var(--lightestVariation); */
    border-radius: 2rem;
  }
  .btn {
    margin-right: 1rem;
  }
  .disable {
    background: #ddd;
    color: var(--darkestVariation);
    cursor: pointer;
    border: transparent;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    padding: 0.375rem 0.75rem;
    box-shadow: var(--shadowSM);
    transition: var(--transition);
    text-transform: capitalize;
    margin-right: 1rem;
    display: inline-block;
  }
  /* @media screen and (min-width: 676px) {
    .button-center {
      width: 70%;
      max-width: 600px;
    }
  } */
`;

export default ButtonsComponent;
