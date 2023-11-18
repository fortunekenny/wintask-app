import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Navbar } from "../components";
import { createContext, useContext, useState } from "react";
import customFetch from "../utils/customFetch";
// import { Toast } from "react-toastify/dist/components";
import { toast } from "react-toastify";

export const loader = async () => {
  // loaders ar used to get data from the backend
  try {
    const { data } = await customFetch.get("/users/showMe");
    return data;
  } catch (error) {
    console.log(error);
    // return error;
    return redirect("/");
  }
};

const UserContext = createContext();

const UserPage = () => {
  const { user } = useLoaderData();
  console.log(user);
  const navigate = useNavigate();

  const [showAdmin, setShowAdmin] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleDarkTheme = () => {
    console.log("toggle dark theme");
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out.......");
  };

  return (
    <UserContext.Provider value={{ user, logoutUser }}>
      <Wrapper>
        <h2>UserPage</h2>
        <div>
          <Navbar />
          <div>
            <Outlet />
          </div>
        </div>
      </Wrapper>
    </UserContext.Provider>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export const useUserContext = () => useContext(UserContext);
export default UserPage;
