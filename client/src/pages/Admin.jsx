import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import UsersComponent from "../components/UsersComponent";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/users/");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return redirect("userpage");
  }
};
// import { useUserContext } from "./UserPage";

const Admin = () => {
  // const data = useUserContext();
  const { users } = useLoaderData();
  // console.log(users);
  return (
    <>
      <h2>Admin page</h2>
      {users.map((user) => {
        return <UsersComponent key={user._id} {...user} />;
      })}
    </>
  );
};

export default Admin;
