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
      {/* <div className="main"> */}
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
      {/* </div> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 2rem;
  .lnk {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 4rem;
    margin: auto auto;
    background: var(--primaryColor);
    box-shadow: var(--shadowLG);
    position: fixed;
    top: 25rem;
    right: 1rem;
    transform: translate(0rem 0rem);
    z-index: 5;
  }
  .lnk:hover {
    background: var(--darkVariation);
    box-shadow: var(--shadowXLG);
  }
  .icon {
    color: var(--lightestVariation);
  }
  @media screen and (min-width: 676px) {
    .lnk {
      top: 496px;
      right: 102.4px;
      /* transform: translateY(-0.6rem);
      transform: translateX(17rem); */
      /* font-size: 2rem;
      width: 40px;
      height: 40px; */
    }
  }
  @media screen and (min-width: 768px) {
    .lnk {
      top: 496px;
      right: 115px;
    }
  }
  @media screen and (min-width: 992px) {
    .lnk {
      top: 496px;
      right: 190px;
    }
  }
  @media screen and (min-width: 1170px) {
    .lnk {
      top: 496px;
      right: 285px;
    }
  }
`;

export default TasksComponent;
