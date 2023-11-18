import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { styled } from "styled-components";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

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
      <Form method="post" className="">
        <h4>Sign-In</h4>
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
        <button type="button" className="">
          explore app
        </button>
        <p>
          Not yet a member?
          <Link to="/signup" className="">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default SignInPage;
