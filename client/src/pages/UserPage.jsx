import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Navbar } from "../components";
import { createContext, useContext, useState, useRef, useEffect } from "react";
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
  const [contain, setContain] = useState(false);
  const navigate = useNavigate();
  const { user } = useLoaderData();

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleDarkTheme = () => {
    console.log("toggle dark theme");
  };

  useEffect(() => {
    let elms = Array.from(document.getElementsByTagName("div"));
    elms.map((elm) => {
      let userpage = Array.from(elm.getElementsByClassName("user-page")).map(
        (div) => {
          const userpageDivs = Array.from(div.getElementsByTagName("div")).map(
            (userpageDiv) => {
              if (
                userpageDiv.classList.contains("create-task-center") ||
                userpageDiv.classList.contains("edit-task-center")
              ) {
                setContain(true);
              }
            }
          );
        }
      );
    });
  });

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
        contain,
      }}
    >
      <Wrapper>
        <div className="user-page">
          <Navbar contain={contain} />
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
