import { Form } from "react-router-dom";
import { BsRepeat1 } from "react-icons/bs";

const RepeatButton = ({ time, id, show }) => {
  return (
    <>
      <Form
        method="post"
        action={`./repeattask/${id}`}
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
