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
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/signin");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const SignUpPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <div className="signup-center">
        <Form method="post" className="form">
          <h4>Register</h4>
          <FormRow type="text" name="name" labelText="name" />
          <FormRow type="email" name="email" labelText="email" />
          <FormRow type="password" name="password" labelText="password" />
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "submit"}
          </button>
          <p>
            Already a member?
            <Link to="/signin" className="">
              Sign-In
            </Link>
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
  .signup-center {
    max-width: 400px;
    min-width: 350px;
    padding-bottom: 1rem;
    background: var(--white);
    box-shadow: var(--shadowLG);
    border-radius: var(--borderRadius);
  }
  .signup-center .form {
    margin-left: 5%;
    margin-right: 5%;
  }
  .signup-center h4 {
    text-align: center;
    margin: 1rem auto;
  }
  .signup-center p {
    margin: 0.5rem auto;
    margin-left: 2rem;
  }
  .signup-center p a {
    display: inline-block;
    margin-left: 0.3rem;
    color: var(--primaryColor);
  }
  .signup-center p a:hover {
    color: var(--darkestVariaton);
    text-decoration: underline;
  }
  .img-center {
    display: none;
  }
  @media screen and (min-width: 990px) {
    width: 75vw;
    .signup-center {
      margin-top: -5rem;
    }
    .img-center {
      display: block;
    }
    .img-center img {
      width: 80%;
    }
  }
`;

export default SignUpPage;
