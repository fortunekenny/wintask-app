import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { styled } from "styled-components";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

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
      <Form method="post" className="">
        <h4>Register</h4>
        <FormRow type="text" name="name" labelText="name" defaultValue="kent" />
        <FormRow
          type="email"
          name="email"
          labelText="email"
          defaultValue="kent@you.com"
        />
        <FormRow
          type="password"
          name="password"
          labelText="password"
          defaultValue="secret"
        />
        <button type="submit" className="" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
      </Form>
      <p>
        Already a member?
        <Link to="/signin" className="">
          Sign-In
        </Link>
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default SignUpPage;
