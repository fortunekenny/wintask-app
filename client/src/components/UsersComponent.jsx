import { styled } from "styled-components";
import AdminSingleUserTasks from "./AdminSingleUserTasks";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
// import CreateTask from "../pages/CreateTask";

const UsersComponent = ({ email, name, role, _id, tasks }) => {
  console.log(tasks);
  return (
    <Wrapper>
      <div className="">
        {/* <Link to={`./singleuserpage/${_id}`}> */}
        <h4>{name}</h4>
        {/* </Link> */}
        <h4>{email}</h4>
        <h4>{role}</h4>
        <h4>{_id}</h4>
        <h4>{tasks.length}</h4>
        {/* {tasks.length === 0 ? (<div className="">
                <h2>No Task</h2>
              </div>)} */}
      </div>
      {tasks.length === 0 ? (
        <div className="">
          <h2>No Task</h2>
          <Link to="createtask">
            <CiSquarePlus /> createTask
          </Link>
        </div>
      ) : (
        tasks.map((task) => {
          return <AdminSingleUserTasks key={task._id} {...task} />;
        })
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: skyblue;
`;

export default UsersComponent;
