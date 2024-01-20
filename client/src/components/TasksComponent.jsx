import { styled } from "styled-components";
import { useTasksContext } from "../pages/Tasks";
import SingleTask from "./SingleTask";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";

const TasksComponent = () => {
  const { data } = useTasksContext();
  let { tasks } = data;
  // Sorting Tasks according to future time
  tasks = tasks.sort(function (x, y) {
    let a = new Date(x.updatedAt).getTime(),
      b = new Date(y.updatedAt).getTime();
    return b - a;
  });

  if (tasks.length === 0) {
    return (
      <Wrapper>
        <h2>No tasks to display.</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* <h4>TasksComponent</h4> */}
      <div className="lnk">
        <Link to="createtask" className="icon">
          +
        </Link>
      </div>
      <div className="">
        {tasks.map((task) => {
          return <SingleTask key={task._id} {...task} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 2rem;
  position: relative;
  .lnk {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 5rem;
    margin: auto auto;
    background: var(--primaryColor);
    box-shadow: var(--shadowLG);
    position: fixed;
    top: 30rem;
    right: 1rem;
    z-index: 5;
  }
  .lnk:hover {
    background: var(--darkVariation);
    box-shadow: var(--shadowXLG);
  }
  .icon {
    color: var(--lightestVariation);
  }
`;

export default TasksComponent;
