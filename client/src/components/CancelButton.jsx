import { Form } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";

const CancelButton = ({ time, id, show }) => {
  return (
    <>
      <Form
        method="post"
        action={`./canceltask/${id}`}
        className={show ? "show" : "hide"}
      >
        <button
          type="submit"
          disabled={time < 1}
          className={time < 1 ? "disable" : "btn2"}
        >
          <MdOutlineCancel />
          <p>Cancel</p>
        </button>
      </Form>
    </>
  );
};

export default CancelButton;
