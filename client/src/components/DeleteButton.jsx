import { Form } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";

const DeleteButton = ({ id, show }) => {
  return (
    <>
      <Form
        method="post"
        action={`./deletetask/${id}`}
        className={show ? "show" : "hide"}
      >
        <button type="submit" className="btn2">
          <RiDeleteBin2Line />
          <p>Delete</p>
        </button>
      </Form>
    </>
  );
};

export default DeleteButton;
