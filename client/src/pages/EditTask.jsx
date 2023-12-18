import { styled } from "styled-components";
import { FormRow } from "../components";
import { useState } from "react";
// import { useOutletContext } from "react-router-dom";
import {
  Form,
  useNavigation,
  redirect,
  Link,
  useLoaderData,
} from "react-router-dom";
import { toast } from "react-toastify";
import { RiCheckboxBlankFill } from "react-icons/ri";
import customFetch from "../utils/customFetch";
import { CiSquarePlus } from "react-icons/ci";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/tasks/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/userpage");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/tasks/${params.id}`, data);
    toast.success("Task edited successfully");
    return redirect("/userpage");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditTask = () => {
  const navigation = useNavigation();
  const { task } = useLoaderData();

  const isSubmitting = navigation.state === "submitting";

  let timeNow = new Date().getHours() > 12 ? "PM" : "AM";

  return (
    <Wrapper>
      <h3>EditTask Page</h3>
      <Link to="..">
        <CiSquarePlus /> userpage
      </Link>
      <Form method="post" className="">
        <FormRow
          type="text"
          name="title"
          labelText="Title"
          defaultValue={task.title}
        />
        <select
          name="alarmHour"
          id="alarmHour"
          defaultValue={
            task.alarmHour > 12 ? task.alarmHour % 12 : task.alarmHour
          }
        >
          <option value={""}>Hour</option>
          {[...Array(12)].map((x, i) => (
            <option value={i + 1} key={i}>
              {i + 1 <= 9 ? `0${i + 1}` : i + 1}
            </option>
          ))}
        </select>
        <select
          name="alarmMinute"
          id="alarmMinute"
          defaultValue={task.alarmMinute}
        >
          <option value={""}>Minute</option>
          {[...Array(60)].map((x, i) => (
            <option value={i} key={i}>
              {i < 10 ? `0${i}` : i}
            </option>
          ))}
        </select>
        <select name="ampm" id="ampm" defaultValue={task.ampm}>
          <option value={""}>AM/PM</option>
          <option value={timeNow}>{timeNow}</option>
          <option value={timeNow === "AM" ? "PM" : "AM"}>
            {timeNow === "AM" ? "PM" : "AM"}
          </option>
        </select>
        <button type="submit" className="" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default EditTask;
