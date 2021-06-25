import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import UserService from "../../../services/UserService";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  title: {
    textAlign: "center",
  },
  btn: {
    minWidth: "200px",
  },
}));

const AddEditUser = () => {
  const classes = useStyles();
  let history = useHistory();
  const theme = useTheme();
  const { id, op } = useParams();
  const [user, setUser] = useState({
    role: "contentWriter",
    status: "1",
  });

  const [validate, setValidate] = useState({
    first_name: false,
    last_name: false,
    mobile: false,
    email: false,
    password: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    UserService.getUser(id)
      .then((response) => {
        setUser(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const setValidationState = (name, status, message) => {
    setValidate({ ...validate, [name]: status });
    setErrorMessage({
      ...errorMessage,
      [name]: message,
    });
  };

  const validateUser = (name, value) => {
    switch (name) {
      case "last_name":
      case "first_name": {
        if (value.length < 3) {
          setValidationState(name, true, "Minimum 3 character are required!");
        } else {
          setValidationState(name, false, "");
        }
        break;
      } //firstname, lastname

      case "mobile": {
        if (!/[0-9]{10}/.test(value)) {
          setValidationState(name, true, "Mobile must be 10 digits only");
        } else {
          setValidationState(name, false, "");
        }
        break;
      } //mobile
      case "password": {
        if (value.length >= 5 && value.length <= 20) {
          setValidationState(name, false, "");
        } else {
          setValidationState(
            name,
            true,
            "Password must be between 5 - 20 characters"
          );
        }
        break;
      } //password

      case "email": {
        if (
          !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          setValidationState(name, true, "Invalid email address");
        } else {
          setValidationState(name, false, "");
        }
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    validateUser(name, value);
  };

  const handleSubmit = () => {
    if (!user.first_name) {
      setValidationState("firstName", true, "First Name is required");
    } else if (!user.last_name) {
      setValidationState("lastName", true, "Last Name is required");
    } else if (!user.mobile) {
      setValidationState("mobile", true, "Mobile is required");
    } else if (!user.email) {
      setValidationState("email", true, "Email is required");
    } else if (!user.password && op == "add") {
      setValidationState("password", true, "Password is required");
    } else {
      if (op == "edit") {
        UserService.updateUser(user, id)
          .then((response) => {
            Swal.fire("User Updated", "The user is updated", "success");
            history.goBack();
          })
          .catch((err) => {
            Swal.fire(
              "User not updated",
              "The user could not updated",
              "error"
            );
          });
      } else {
        UserService.createUser(user)
          .then((response) => {
            Swal.fire("User Created", "The user is created", "success");
            history.goBack();
          })
          .catch((err) => {
            Swal.fire(
              "User not created",
              "The user is could not be created",
              "error"
            );
          });
      }
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <h1 className={classes.title}>
            {op == "edit" ? "Edit" : "Add"} User
          </h1>
          <Grid container spacing={3}>
            {[
              {
                label: "First Name",
                name: "first_name",
                type: "text",
              },
              {
                label: "Last Name",
                name: "last_name",
                type: "text",
              },
              {
                label: "Mobile",
                name: "mobile",
                type: "tel",
              },
              {
                label: "Email",
                name: "email",
                type: "email",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
              },
            ].map((field, i) => {
              return (
                <Grid item xs={12} sm={6} key={field.name + i}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={user[field.name] ? user[field.name] : ""}
                    autoComplete={field.name}
                    onChange={handleChange}
                    error={validate[field.name]}
                    helperText={errorMessage[field.name]}
                  />
                </Grid>
              );
            })}
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="role">Status</InputLabel>
                <Select
                  native
                  fullWidth
                  label="Status"
                  value={user.status}
                  inputProps={{
                    name: "status",
                    id: "status",
                  }}
                  onChange={handleChange}
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Divider />
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={handleSubmit}
              >
                {op == "edit" ? "Update" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default AddEditUser;
