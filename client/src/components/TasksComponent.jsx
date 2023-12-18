import { styled } from "styled-components";
import { useTasksContext } from "../pages/Tasks";
import Task from "./task";

const TasksComponent = () => {
  const { data } = useTasksContext();
  let { tasks } = data;
  // console.log(tasks);
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
      <h4>TasksComponent</h4>
      <div className="">
        {tasks.map((task) => {
          return <Task key={task._id} {...task} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default TasksComponent;
