import React, { useEffect, useState } from "react";
import BlogService from "../../../services/BlogService";
import MUIDataTable from "mui-datatables";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
const BlogList = () => {
  const useStyle = makeStyles(() => ({
    icons: {
      margin: "10px",
      cursor: "pointer",
      "&:hover": {
        background: "green",
      },
    },
  }));
  const classes = useStyle();
  const userObj = useSelector(selectUser);
  const [blogs, setBlogs] = useState();
  const history = useHistory();
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    if (userObj.role == "admin") {
      await BlogService.getAllBlogs()
        .then((res) => {
          console.log(res.data.data);
          setBlogs(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await BlogService.getBlogByUser(userObj._id)
        .then((res) => {
          console.log(res.data.data);
          setBlogs(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteBlog = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this blog!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        BlogService.deleteBlog(id)
          .then((res) => {
            Swal.fire("Deleted!", "The blog has been deleted.", "success");
            loadBlogs();
          })
          .catch((err) => {
            Swal.fire(
              "Not Deleted!",
              "The blog has not been deleted.",
              "error"
            );
          });
      }
    });
  };

  const handleAcceptBlog = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this blog!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        BlogService.updateBlog({ status: 1 }, id)
          .then((res) => {
            Swal.fire("Approved!", "The blog has been Approved.", "success");
            loadBlogs();
          })
          .catch((err) => {
            Swal.fire(
              "Not Approved!",
              "The blog has not been approved.",
              "error"
            );
          });
      }
    });
  };

  const handleEdit = (id) => {
    history.push(`/secured/blogs/addEditBlog/${id}/edit`);
  };
  const handleAddBlog = () => {
    history.push(`/secured/blogs/addEditBlog/0/Add`);
  };

  const columns = [
    {
      label: "Sr.No",
      name: "sr.no",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          return dataIndex + 1;
        },
      },
    },
    {
      label: "Title",
      name: "title",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Created By",
      name: "createdBy",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return `${value.first_name}  ${value.last_name}`;
        },
      },
    },
    {
      label: "Created On",
      name: "createdAt",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          let currentDate = new Date(value);
          return currentDate.toLocaleDateString();
        },
      },
    },
    {
      label: "Status",
      name: "status",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return value == 0 ? `Pending` : `Approved`;
        },
      },
    },
    {
      label: "Action",
      name: "action",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const u = blogs[dataIndex];
          return (
            <>
              {u.status == 0 && userObj.role == "admin" && (
                <DoneIcon
                  className={classes.icons}
                  onClick={() => handleAcceptBlog(u._id)}
                />
              )}
              <EditIcon
                className={classes.icons}
                onClick={() => handleEdit(u._id)}
              />

              {userObj.role == "admin" && (
                <DeleteIcon
                  className={classes.icons}
                  onClick={() => handleDeleteBlog(u._id)}
                />
              )}
            </>
          );
        },
      },
    },
  ];
  return (
    <>
      <Fab color="primary" aria-label="add" onClick={handleAddBlog}>
        <AddIcon />
      </Fab>
      <MUIDataTable data={blogs} columns={columns} title="Blog List" />
    </>
  );
};

export default BlogList;
