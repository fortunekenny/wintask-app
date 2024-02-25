import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export async function action({ params }) {
  try {
    await customFetch.delete(`/tasks/${params.id}`);
    toast.success("Task deleted");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect("..");
}
