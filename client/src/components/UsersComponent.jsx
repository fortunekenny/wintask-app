import { styled } from "styled-components";
import AdminSingleUserTasks from "./AdminSingleUserTasks";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
// import CreateTask from "../pages/CreateTask";

const UsersComponent = ({ email, name, role, tasks }) => {
  // console.log(tasks.length);
  return (
    <Wrapper>
      {/* <Link to={`./adminsingleuserpage/${_id}`}> */}
      <div className="">
        <h4>{name}</h4>
        {/* </Link> */}
        <h4>{email}</h4>
      </div>
      <div className="">
        <Link to="admincreatetask" className="lnk">
          +
        </Link>
        {tasks.length === 0 ? (
          <h2>No Task</h2>
        ) : (
          tasks.map((task) => {
            return <AdminSingleUserTasks key={task._id} {...task} />;
          })
        )}
      </div>
      <div className="">
        <h4>role: {role}</h4>
        {tasks.length > 0 ? (
          <h4>
            {tasks.length} {tasks.length > 1 ? "Tasks" : "Task"}
          </h4>
        ) : null}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: skyblue;

  .lnk {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    color: var(--lightestVariation);
    font-size: 1.8rem;
    border-radius: 50%;
    background: var(--primaryColor);
    box-shadow: var(--shadowLG);
    /* position: fixed; */
    z-index: 5;
  }
  .lnk:hover {
    background: var(--darkVariation);
    box-shadow: var(--shadowXLG);
  }
`;

export default UsersComponent;
