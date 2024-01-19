import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Navbar } from "../components";
import { createContext, useContext, useState } from "react";
import customFetch from "../utils/customFetch";
// import { Toast } from "react-toastify/dist/components";
import { toast } from "react-toastify";
import LiveTime from "../components/LiveTime";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/users/showMe");
    return data;
  } catch (error) {
    console.log(error);
    return redirect("userpage");
  }
};

const UserContext = createContext();

const UserPage = () => {
  const navigate = useNavigate();
  const { user } = useLoaderData();

  // const [showAdmin, setShowAdmin] = useState(false);
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
    <UserContext.Provider
      value={{
        user,
        isDarkTheme,
        toggleDarkTheme,
        logoutUser,
      }}
    >
      <Wrapper>
        {/* <h2>UserPage</h2> */}
        <div className="user-page">
          <Navbar />
          <LiveTime />
          <div>
            <Outlet context={{ user }} />
            {/* <Outlet /> */}
          </div>
        </div>
      </Wrapper>
    </UserContext.Provider>
  );
};

const Wrapper = styled.div`
  .user-page {
    /* background: skyblue; */
    /* display: flex; */
    /* justify-content: center; */
    /* align-items: center; */
    /* flex-wrap: wrap; */
    /* width: 100vw; */
    /* max-width: 700px; */
    margin: 0 auto;
  }
  /* .user-page > div {
    display: block;
  } */
`;

export default UserPage;
export const useUserContext = () => useContext(UserContext);
