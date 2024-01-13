// import { styled } from "styled-components";
// import {
//   Outlet,
//   redirect,
//   useLoaderData,
//   useNavigate,
//   Link,
// } from "react-router-dom";
// // import { Navbar } from ".";
// import { createContext, useContext, useState } from "react";
// import customFetch from "../utils/customFetch";
// import { toast } from "react-toastify";

// export const loader = async ({ params }) => {
//   try {
//     const { data } = await customFetch.get(`/users/${params.id}`);
//     console.log(data);
//     return data;
//   } catch (error) {
//     toast.error(error?.response?.data?.msg);
//     return; //redirect("/userpage");
//   }
// };

// const AdminSingleUserPage = () => {
//   return <div>AdminSingleUserPage</div>;
// };

// export default AdminSingleUserPage;
