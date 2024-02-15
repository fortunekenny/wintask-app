import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { styled } from "styled-components";
import { Navbar } from "../components";
import { createContext, useContext, useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

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
  const { user } = useLoaderData();
  // const [contain, setContain] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const navigate = useNavigate();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  // TO SET NAVBAR TO SHOW
  useEffect(() => setShowNavbar(true), [setShowNavbar]);
  // END

  // useEffect(() => {
  //   const handleLoad = () => {
  //     // Perform actions after the component has fully loaded
  //   };
  //   window.addEventListener("load", handleLoad);
  //   return () => {
  //     window.removeEventListener("load", handleLoad);
  //   };
  // }, []);

  // LISTENING TO WINDOW SIZE
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);
  // LISTENING TO WINDOW SIZE END

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
        windowWidth,
        windowHeight,
        showNavbar,
        setShowNavbar,
      }}
    >
      <Wrapper>
        <div className="user-page">
          {showNavbar ? <Navbar /> : null}
          <div className="outlet">
            <Outlet context={{ user }} />
          </div>
        </div>
      </Wrapper>
    </UserContext.Provider>
  );
};

const Wrapper = styled.div`
  width: 90vw;
  margin: auto;

  .user-page {
    margin: 0 auto;
  }
  @media screen and (max-width: 502px) {
    width: 100vw;
    margin: 0 auto;
  }
`;

export default UserPage;
export const useUserContext = () => useContext(UserContext);
