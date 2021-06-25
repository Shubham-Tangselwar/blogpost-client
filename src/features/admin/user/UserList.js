import React, { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import MUIDataTable from "mui-datatables";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
const UserList = () => {
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
  const [users, setUsers] = useState();
  const history = useHistory();
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    await UserService.getAllUsers()
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        UserService.deleteUser(id)
          .then((res) => {
            Swal.fire("Deleted!", "The user has been deleted.", "success");
            loadUsers();
          })
          .catch((err) => {
            Swal.fire(
              "Not Deleted!",
              "The user has not been deleted.",
              "error"
            );
          });
      }
    });
  };

  const handleEdit = (id) => {
    history.push(`/secured/user/addEditUser/${id}/edit`);
  };
  const handleAddUser = () => {
    history.push(`/secured/user/addEditUser/0/Add`);
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
      label: "Name",
      name: "name",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const u = users[dataIndex];
          return `${u.first_name}  ${u.last_name}`;
        },
      },
    },
    {
      label: "Role",
      name: "role",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Status",
      name: "status",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return value == 0 ? `Inactive` : `Active`;
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
          const u = users[dataIndex];
          return (
            <>
              <EditIcon
                className={classes.icons}
                onClick={() => handleEdit(u._id)}
              />

              <DeleteIcon
                className={classes.icons}
                onClick={() => handleDeleteUser(u._id)}
              />
            </>
          );
        },
      },
    },
  ];
  return (
    <>
      <Fab color="primary" aria-label="add" onClick={handleAddUser}>
        <AddIcon />
      </Fab>
      <MUIDataTable data={users} columns={columns} title="User List" />
    </>
  );
};

export default UserList;
