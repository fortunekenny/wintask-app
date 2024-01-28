import { toast } from "react-toastify";
import { TasksComponent } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

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
      <TasksContext.Provider value={{ data }}>
        <TasksComponent />
      </TasksContext.Provider>
    </>
  );
};

export default Tasks;
export const useTasksContext = () => useContext(TasksContext);
