import { useEffect } from "react";
import { styled } from "styled-components";
import { FormRow } from "../components";
import { Form, useNavigation, redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import LiveTime from "../components/LiveTime";
import { IoIosArrowRoundBack } from "react-icons/io";
import hero3 from "../assets/images/hero3.svg";
import { useUserContext } from "../pages/UserPage";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
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
  const { setShowNavbar } = useUserContext();

  // TO HIDE NAVBAR
  useEffect(() => setShowNavbar(false), [setShowNavbar]);
  // END

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  let timeNow = new Date().getHours() > 12 ? "PM" : "AM";
  let secondsNow = new Date().getSeconds();

  return (
    <Wrapper>
      <div
        className="create-task-center"
        // style={
        //   contain && windowWidth < 990
        //     ? { marginTop: `${20}%` }
        //     : { marginTop: `${-15}%` }
        // }
      >
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
  max-width: 450px;
  text-transform: capitalize;
  margin: auto;
  margin-top: 10rem;
  .create-task-center {
    width: 100%;
    padding-bottom: 1rem;
    background: var(--white);
    box-shadow: var(--shadowLG);
    border-radius: var(--borderRadius);
  }
  .create-task-center .time-center {
    margin-bottom: 1rem;
  }

  .create-task-center .form {
    margin-left: 10%;
    margin-right: 10%;
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

  @media screen and (max-width: 500px) {
    margin-top: 40%;
    width: 95%;
    .create-task-center {
      width: 100%;
    }
  }

  @media screen and (min-width: 990px) {
    margin-top: 10%;
    width: 100%;
    max-width: 1000px;
    .create-task-center {
      margin-top: -20%;
      width: 100%;
      max-width: 450px;
    }
    .img-center {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40rem;
    }
    .img-center img {
      width: 100%;
    }
    h1 {
      font-size: 2.9rem;
    }
  }
`;

export default CreateTask;
