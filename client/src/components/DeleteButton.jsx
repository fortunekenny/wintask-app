import { Form } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";

const DeleteButton = ({ actionstring, show }) => {
  return (
    <>
      <Form
        method="post"
        action={actionstring}
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
