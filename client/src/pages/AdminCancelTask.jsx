import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/tasks/${params.id}`);
    redirect("..");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/tasks/canceltask/${params.id}`, data);
    toast.success("Task cancelled");
    return redirect("..");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
