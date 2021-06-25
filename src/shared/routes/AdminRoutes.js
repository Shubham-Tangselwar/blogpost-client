import React, { lazy } from "react";
import HospitalIcon from "@material-ui/icons/LocalHospital";
import DashboardIcon from "@material-ui/icons/Dashboard";
import UserIcon from "@material-ui/icons/People";
import BookIcon from "@material-ui/icons/Book";
const User = lazy(() => import("../../features/admin/user/User"));
const Blogs = lazy(() => import("../../features/admin/blog/Blog"));
const Dashboard = lazy(() =>
  import("../../features/admin/dashboard/Dashboard")
);
export default [
  {
    title: "Dashboard",
    path: "/",
    showInMenu: true,
    accessTo: "all",
    icon: <DashboardIcon />,
    component: <Dashboard />,
  },
  {
    title: "User",
    component: <User />,
    path: "/user",
    showInMenu: true,
    icon: <UserIcon />,
    accessTo: "admin",
  },
  {
    title: "Blogs",
    component: <Blogs />,
    path: "/blogs",
    showInMenu: true,
    icon: <BookIcon />,
    accessTo: "all",
  },
];
