import { styled } from "styled-components";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  Link,
} from "react-router-dom";
import { Navbar } from ".";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const UsersComponent = ({ email, name, role, _id, tasks }) => {
  return (
    <Wrapper>
      <div className="">
        <Link to={`./singleuserpage/${_id}`}>
          <h4>{name}</h4>
        </Link>
        <h4>{email}</h4>
        <h4>{role}</h4>
        <h4>{_id}</h4>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background: skyblue;
`;

export default UsersComponent;
