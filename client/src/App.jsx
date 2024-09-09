import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import {
  HomeLayout,
  LandingPage,
  EditTask,
  SignInPage,
  SignUpPage,
  Tasks,
  CreateTask,
  UserPage,
  Admin,
  Profile,
  AdminUsersPage,
  AdminCreateTaskPage,
  AdminEditTask,
  // AdminSingleUserPage,
} from "./pages";

import { action as signupAction } from "./pages/SignUpPage";
import { action as signinAction } from "./pages/SignInPage";
import { loader as userpageLoader } from "./pages/UserPage";
import { loader as tasksLoader } from "./pages/Tasks";
import { loader as editTaskLoader } from "./pages/EditTask";
import { action as editTaskAction } from "./pages/EditTask";
import { action as createTaskAction } from "./pages/CreateTask";
import { action as deleteTaskAction } from "./pages/DeleteTask";
import { loader as repeatTaskLoader } from "./pages/RepeatTask";
import { action as repeatTaskAction } from "./pages/RepeatTask";
import { loader as cancelTaskLoader } from "./pages/CancelTask";
import { action as cancelTaskAction } from "./pages/CancelTask";
import { loader as usersLoader } from "./pages/Admin";
import { action as adminCreateTaskAction } from "./pages/AdminCreateTask";
import { loader as adminCancelTaskLoader } from "./pages/CancelTask";
import { action as adminCancelTaskAction } from "./pages/CancelTask";
import { loader as adminRepeatTaskLoader } from "./pages/AdminRepeatTask";
import { action as adminRepeatTaskAction } from "./pages/AdminRepeatTask";
import { loader as adminEditTaskLoader } from "./pages/AdminEditTask";
import { action as adminEditTaskAction } from "./pages/AdminEditTask";
import { action as adminDeleteTaskAction } from "./pages/AdminDeleteTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        // path: "/",
        index: true,
        element: <LandingPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
        action: signupAction,
      },
      {
        path: "signin",
        element: <SignInPage />,
        action: signinAction,
      },
      {
        path: "userpage",
        element: <UserPage />,
        loader: userpageLoader, // loaders ar used to get data from the backend
        children: [
          {
            // index: true,
            path: "/userpage/createtask",
            element: <CreateTask />,
            action: createTaskAction,
          },
          {
            index: true,
            // path: "tasks",
            element: <Tasks />,
            loader: tasksLoader,
          },
          {
            path: "edittask/:id",
            element: <EditTask />,
            loader: editTaskLoader,
            action: editTaskAction,
          },
          {
            path: "deletetask/:id",
            action: deleteTaskAction,
            element: <Navigate to='..' />,
          },
          {
            path: "repeattask/:id",
            loader: repeatTaskLoader,
            action: repeatTaskAction,
            element: <Navigate to='..' />,
          },
          {
            path: "canceltask/:id",
            loader: cancelTaskLoader,
            action: cancelTaskAction,
            element: <Navigate to='..' />,
          },
          {
            path: "profile/:id",
            element: <Profile />,
          },
          {
            path: "admin",
            loader: usersLoader,
            element: <Admin />,
            children: [
              {
                index: true,
                element: <AdminUsersPage />,
              },
              {
                path: "admincreatetask",
                element: <AdminCreateTaskPage />,
                action: adminCreateTaskAction,
              },
              {
                path: "admincanceltask/:id",
                loader: adminCancelTaskLoader,
                action: adminCancelTaskAction,
                element: <Navigate to='..' />,
              },
              {
                path: "adminrepeattask/:id",
                loader: adminRepeatTaskLoader,
                action: adminRepeatTaskAction,
                element: <Navigate to='.' />,
              },
              {
                path: "adminedittask/:id",
                element: <AdminEditTask />,
                loader: adminEditTaskLoader,
                action: adminEditTaskAction,
              },
              {
                path: "admindeletetask/:id",
                action: adminDeleteTaskAction,
                element: <Navigate to='..' />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
