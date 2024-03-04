import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { createContext, useContext, useState, useEffect } from "react";
import styled from "styled-components";

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

const AdminContext = createContext();

const Admin = () => {
  const { users } = useLoaderData();
  // console.log(users);
  return (
    <AdminContext.Provider
      value={{
        users,
      }}
    >
      <Wrapper>
        {/* <div className="adminoutlet"> */}
        <Outlet />
        {/* </div> */}
      </Wrapper>
    </AdminContext.Provider>
  );
};

const Wrapper = styled.div`
  width: 95%;
  margin: 0px auto;
  margin-top: 10px;
  /* background: red; */
  @media screen and (min-width: 676px) {
    max-width: 600px;
  }
`;

export default Admin;
export const useAdminContext = () => useContext(AdminContext);
