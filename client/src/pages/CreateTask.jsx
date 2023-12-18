import { styled } from "styled-components";
import { FormRow } from "../components";
import { useState } from "react";
// import { useOutletContext } from "react-router-dom";
import { Form, useNavigation, redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiCheckboxBlankFill } from "react-icons/ri";
import customFetch from "../utils/customFetch";
import { CiSquarePlus } from "react-icons/ci";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    await customFetch.post("/tasks", data);
    toast.success("Task created");
    return redirect("/userpage");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const CreateTask = () => {
  // const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  let timeNow = new Date().getHours() > 12 ? "PM" : "AM";
  // const [ampm, setAmpm] = useState(timeNow);
  // const setTimeNow = () => {
  //   ampm === "AM" ? setAmpm("PM") : setAmpm("AM");
  // };

  return (
    <Wrapper>
      <h3>CreateTask Page</h3>
      <Link to="..">
        <CiSquarePlus /> userpage
      </Link>
      <Form method="post">
        <div className="">
          <FormRow type="text" name="title" labelText="Title" />
          <select name="alarmHour" id="alarmHour">
            <option value={""}>Hour</option>
            {[...Array(12)].map((x, i) => (
              <option value={i + 1} key={i}>
                {i + 1 <= 9 ? `0${i + 1}` : i + 1}
              </option>
            ))}
          </select>
          <select name="alarmMinute" id="alarmMinute">
            <option value={""}>Minute</option>
            {[...Array(60)].map((x, i) => (
              <option value={i} key={i}>
                {i < 10 ? `0${i}` : i}
              </option>
            ))}
          </select>
          <select name="ampm" id="ampm">
            <option value={""}>AM/PM</option>
            <option value={timeNow}>{timeNow}</option>
            <option value={timeNow === "AM" ? "PM" : "AM"}>
              {timeNow === "AM" ? "PM" : "AM"}
            </option>
          </select>
          <button type="submit" className="" disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default CreateTask;
