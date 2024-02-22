import { styled } from "styled-components";
import AdminSingleUserTasks from "./AdminSingleUserTasks";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
// import CreateTask from "../pages/CreateTask";

const UsersComponent = ({ email, name, role, _id, tasks }) => {
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
        {tasks.length === 0 ? (
          <h2>No Task</h2>
        ) : (
          /* <Link to="admincreatetask">
              <CiSquarePlus /> createTask
            </Link> */

          tasks.map((task) => {
            return <AdminSingleUserTasks key={task._id} {...task} />;
          })
        )}
      </div>
      <div className="">
        <h4>role: {role}</h4>
        {tasks.length > 0 ? <h4> {tasks.length} Task </h4> : null}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: skyblue;
`;

export default UsersComponent;
