import styled from "styled-components";
import { Link, Form } from "react-router-dom";

const ButtonsComponent = ({ remainderTime, _id }) => {
  return (
    <Wrapper>
      <Form method="post" action={`./repeattask/${_id}`}>
        <button type="submit" disabled={remainderTime > 1}>
          Repeat
        </button>
      </Form>
      <Form method="post" action={`./canceltask/${_id}`}>
        <button type="submit" disabled={remainderTime < 1}>
          Cancel
        </button>
      </Form>
      <Link to={`./edittask/${_id}`}>
        <button type="button" disabled={remainderTime > 1}>
          Edit
        </button>
      </Link>
      <Form method="post" action={`./deletetask/${_id}`}>
        <button type="submit">Delete</button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default ButtonsComponent;
