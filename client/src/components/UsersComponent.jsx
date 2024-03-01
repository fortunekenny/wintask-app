import { styled } from "styled-components";
import AdminSingleUserTasks from "./AdminSingleUserTasks";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
// import CreateTask from "../pages/CreateTask";

const UsersComponent = ({ email, name, role, tasks }) => {
  // console.log(tasks.length);
  return (
    <Wrapper>
      {/* <div className="center"> */}
      <div className="top-cap">
        {/* <h4 style={{ borderRight: "2px solid var(--lightVariation)" }}> */}
        <h4>{name}</h4>
        <h4 style={{ textTransform: "lowercase" }}>{email}</h4>
      </div>
      <div className="task">
        {/* <Link to="admincreatetask" className="lnk">
          +
        </Link> */}
        {tasks.length === 0 ? (
          <h2>No Task</h2>
        ) : (
          tasks.map((task) => {
            return <AdminSingleUserTasks key={task._id} {...task} />;
          })
        )}
      </div>
      <div className="bottom-cap">
        <h4>role: {role}</h4>
        {tasks.length > 0 ? (
          <h4>
            {tasks.length} {tasks.length > 1 ? "Tasks" : "Task"}
          </h4>
        ) : null}
      </div>
      {/* </div> */}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: var(--white);
  margin: 2rem 1rem;
  /* border-radius: 20px; */
  .task {
    width: 95%;
    margin: 0px auto;
    padding: 0px 0px;
    /* border-bottom: 5px solid var(--white); */
  }

  .top-cap {
    display: grid;
    grid-template-columns: 1fr 2fr;
    justify-items: center;
    width: 95%;
    margin: auto;
    /* margin-top: 5px; */
    padding: 0.3rem;
    background: var(--lightestVariation);
    border-top-right-radius: 100px;
    border-top-left-radius: 100px;
    overflow: hidden;
  }
  .bottom-cap {
    display: grid;
    grid-template-columns: max-content 2fr;
    justify-items: center;
    justify-items: center;
    width: 95%;
    margin: auto;
    padding: 0.3rem;
    background: var(--lightestVariation);
    border-bottom-right-radius: 100px;
    border-bottom-left-radius: 100px;
    overflow: hidden;
  }
  .top-cap h4,
  .bottom-cap h4 {
    font-size: 1.3rem;
    margin-bottom: 0;
  }
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
