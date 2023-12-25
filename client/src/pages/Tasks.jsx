import { toast } from "react-toastify";
import { TasksComponent } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData, Link, NavLink } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { useContext, createContext } from "react";
import { styled } from "styled-components";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/tasks/usertasks");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const TasksContext = createContext();

const Tasks = () => {
  const { data } = useLoaderData();
  return (
    <>
      <h2>Tasks</h2>
      <Link to="createtask">
        <CiSquarePlus /> createTask
      </Link>
      <TasksContext.Provider value={{ data }}>
        <TasksComponent />
      </TasksContext.Provider>
    </>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default Tasks;
export const useTasksContext = () => useContext(TasksContext);
