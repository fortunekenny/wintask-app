import { styled } from "styled-components";
import { FormRow } from "../components";
import {
  Form,
  useNavigation,
  redirect,
  Link,
  useLoaderData,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import LiveTime from "../components/LiveTime";
import { IoIosArrowRoundBack } from "react-icons/io";
import hero3 from "../assets/images/hero3.svg";

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
  let secondsNow = new Date().getSeconds();
  return (
    <Wrapper>
      <div className="edit-task-center">
        <LiveTime />
        <Form method="post" className="form">
          <div className="selector">
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
            <select
              name="alarmSeconds"
              id="alarmSeconds"
              defaultValue={task.alarmSeconds}
            >
              <option value={""}>Seconds</option>
              <option value={secondsNow}>Seconds Now</option>
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
          </div>
          <div className="editBtns">
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "submitting..." : "submit"}
            </button>
            <Link to=".." reloadDocument className="btn-back">
              <IoIosArrowRoundBack /> back
            </Link>
          </div>
        </Form>
      </div>
      <div className="img-center">
        <img src={hero3} alt="hero image" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background: var(--lightestVariation);
  width: 100vw;
  height: calc(100vh - 64.38px);
  text-transform: capitalize;
  margin: auto;
  .edit-task-center {
    max-width: 400px;
    min-width: 400px;
    padding-bottom: 1rem;
    background: var(--white);
    box-shadow: var(--shadowLG);
    border-radius: var(--borderRadius);
  }
  .edit-task-center .form {
    margin-left: 5%;
    margin-right: 5%;
  }
  .selector select {
    height: 1.5rem;
    font-size: 1rem;
    margin-right: 5px;
    margin-bottom: 1rem;
    background: var(--lightestVariation);
    border-radius: var(--borderRadius);
    border: 1px solid var(--mediumVariation);
  }
  .selector select:focus {
    outline: none;
  }
  .editBtns {
    display: flex;
    justify-content: space-between;
  }
  .btn-back {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primaryColor);
    background: transparent;
    padding-right: 0.5rem;
  }
  .btn-back:hover {
    color: var(--darkestVariation);
  }
  .img-center {
    display: none;
  }

  @media screen and (min-width: 990px) {
    .edit-task-center {
      margin-top: -10rem;
    }
    .img-center {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
    }
    .img-center img {
      width: 100%;
    }
  }
`;

export default EditTask;
