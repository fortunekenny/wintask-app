import { styled } from "styled-components";
import { Outlet, redirect, useNavigate, Link } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { useAdminContext } from "../pages/Admin";
import { UsersComponent } from "../components";
import { toast } from "react-toastify";

const AdminUsersPage = () => {
  const { users } = useAdminContext();
  // console.log(users);
  return (
    <>
      <h3>AdminUserPage</h3>
      {users.map((user) => {
        // console.log(user.tasks.length);
        return (
          <UsersComponent
            key={user._id}
            {...user}
            taskLength={user.tasks.length}
          />
        );
      })}
    </>
  );
};

export default AdminUsersPage;
