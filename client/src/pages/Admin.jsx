import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { createContext, useContext, useState, useEffect } from "react";

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
      <>
        <div className="outlet">
          <Outlet />
        </div>
      </>
    </AdminContext.Provider>
  );
};

export default Admin;
export const useAdminContext = () => useContext(AdminContext);
