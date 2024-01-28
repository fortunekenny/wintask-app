import { styled } from "styled-components";
import { FormRow } from "../components";
import { Form, useNavigation, redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import LiveTime from "../components/LiveTime";
import { IoIosArrowRoundBack } from "react-icons/io";
import hero3 from "../assets/images/hero3.svg";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(typeof data.alarmHour);
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
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  let timeNow = new Date().getHours() > 12 ? "PM" : "AM";
  let secondsNow = new Date().getSeconds();
  // reloadDocument;
  return (
    <Wrapper>
      <div className="create-task-center">
        <LiveTime />
        <Form method="post" className="form">
          <div className="selector">
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
            <select name="alarmSeconds" id="alarmSeconds">
              <option value={""}>Seconds</option>
              <option value={secondsNow}>Seconds Now</option>
              {[...Array(60)].map((x, i) => (
                <option value={i} key={i}>
                  {i < 10 ? `0${i}` : i}
                </option>
              ))}
            </select>
            <select name="ampm" id="ampm">
              <option value={""}>AM/PM</option>
              <option value={`${timeNow}`}>{timeNow}</option>
              <option value={timeNow === "AM" ? "PM" : "AM"}>
                {timeNow === "AM" ? "PM" : "AM"}
              </option>
            </select>
          </div>
          <div className="create-btns">
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "submitting..." : "submit"}
            </button>
            <Link to=".." className="btn-back" reloadDocument>
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
  height: 100vh;
  /* height: calc(100vh - 64.38px); */
  text-transform: capitalize;
  margin: auto;
  .create-task-center {
    max-width: 400px;
    min-width: 400px;
    padding-bottom: 1rem;
    background: var(--white);
    box-shadow: var(--shadowLG);
    border-radius: var(--borderRadius);
  }
  .create-task-center .time-center {
    margin-bottom: 1rem;
  }

  .create-task-center .form {
    margin-left: 5%;
    margin-right: 5%;
  }

  .form {
  }

  .selector {
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
  .selector select option {
    font-size: 1rem;
  }
  .selector select option:hover {
    background: var(--darkVariation);
    color: var(--lightestVariation);
  }
  .create-btns {
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
    .create-task-center {
      margin-top: -10rem;
    }
    .img-center {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
    }
    .img-center img {
      width: 80%;
    }
  }
`;

export default CreateTask;
