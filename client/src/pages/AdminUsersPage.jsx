import { styled } from "styled-components";
import { Outlet, redirect, useNavigate, Link } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { useAdminContext } from "../pages/Admin";
import { UsersComponent } from "../components";
import { toast } from "react-toastify";

const AdminUsersPage = () => {
  const { users } = useAdminContext();

  const [activeId, setActiveId] = useState(null);

  const toggleId = (id) => {
    const newActiveId = id === activeId ? null : id;
    setActiveId(newActiveId);
  };
  return (
    <>
      {users.map((user) => {
        return (
          <UsersComponent
            key={user._id}
            {...user}
            taskLength={user.tasks.length}
            activeId={activeId}
            toggleId={toggleId}
          />
        );
      })}
    </>
  );
};

export default AdminUsersPage;
