import { Link } from "react-router-dom";
import { RiEditCircleLine } from "react-icons/ri";

const EditButton = ({ time, id, show }) => {
  return (
    <>
      <Link to={`./edittask/${id}`} className={show ? "show" : "hide"}>
        <button
          type="button"
          disabled={time > 1}
          className={time > 1 ? "disable" : "btn2"}
        >
          <RiEditCircleLine />
          <p>Edit</p>
        </button>
      </Link>
    </>
  );
};

export default EditButton;
