import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { styled } from "styled-components";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import hero2 from "../assets/images/hero2.svg";
import hero3 from "../assets/images/hero3.svg";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("You are logged in");
    return redirect("/userpage");
    // return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const SignInPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <div className="form-center">
        <Form method="post" className="form">
          <h4>Sign-In</h4>
          <FormRow type="email" name="email" labelText="email" />
          <FormRow type="password" name="password" labelText="password" />
          <div className="signup-btns">
            <button
              type="submit"
              className="btn signup-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "submitting..." : "submit"}
            </button>
            <button type="button" className="btn signup-btn">
              explore app
            </button>
          </div>
          <p>
            Not yet a member?
            <Link to="/signup">Register</Link>
          </p>
        </Form>
      </div>
      <div className="img-center">
        <img src={hero2} alt="hero image" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background: var(--lightestVariation);
  width: 100vw;
  height: 100vh;
  text-transform: capitalize;
  margin: auto;

  .form-center {
    /* border: 1px solid red; */
    width: 55%;
    max-width: 300px;
    background: var(--white);
    border-radius: var(--borderRadius);
    /* margin: auto; */
    box-shadow: var(--shadowLG);
  }
  .form-center .form {
    margin-left: 5%;
    margin-right: 5%;
  }
  .form-center h4 {
    text-align: center;
    margin: 1rem auto;
  }

  .signup-btns {
    display: flex;
    justify-content: space-between;
    max-width: 173px;
    min-width: 173px;
    margin: 0.5rem auto;
    margin-top: 0;
    margin-left: 0;
  }
  .signup-btn {
    /* letter-spacing: 0; */
    padding: 0.375rem 0.5rem;
  }
  .form-center p {
    margin: 0.5rem auto;
  }
  .form-center p a {
    display: inline-block;
    margin-left: 0.3rem;
  }
  .img-center {
    display: none;
  }
  @media screen and (min-width: 990px) {
    width: 75vw;
    .img-center {
      display: block;
    }
    .img-center img {
      width: 80%;
    }
  }
`;

export default SignInPage;
