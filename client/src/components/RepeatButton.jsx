import { Form } from "react-router-dom";
import { BsRepeat1 } from "react-icons/bs";

const RepeatButton = ({ time, show, actionstring }) => {
  return (
    <>
      <Form
        method="post"
        action={actionstring}
        className={show ? "show" : "hide"}
      >
        <button
          type="submit"
          disabled={time > 1}
          className={time > 1 ? "disable" : "btn2"}
        >
          <BsRepeat1 />
          <p>Repeat</p>
        </button>
      </Form>
    </>
  );
};

export default RepeatButton;
