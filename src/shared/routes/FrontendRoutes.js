import React, { lazy } from "react";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AccountCircle from "@material-ui/icons/AccountCircle";
const Home = lazy(() => import("../../features/frontend/home/Home"));
const Login = lazy(() => import("../../features/frontend/login/Login"));

export default [
  {
    title: "Home",
    component: <Home />,
    showInMenu: true,
    path: "/",
    icon: <HomeRoundedIcon />,
  },
  {
    title: "Login",
    component: <Login />,
    showInMenu: true,
    path: "/login",
    icon: <AccountCircle />,
  },
];
