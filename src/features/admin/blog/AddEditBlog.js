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
import BlogService from "../../../services/BlogService";
import Swal from "sweetalert2";
import { selectUser } from "../../../slices/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
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

const AddEditBlog = () => {
  const classes = useStyles();
  let history = useHistory();
  const userObj = useSelector(selectUser);
  const theme = useTheme();
  const { id, op } = useParams();
  const [blog, setBlog] = useState({
    status: "0",
  });

  const [validate, setValidate] = useState({
    title: false,
    shortContent: false,
    content: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    title: "",
    shortContent: "",
    content: "",
  });

  useEffect(() => {
    BlogService.getBlog(id)
      .then((response) => {
        setBlog(response.data.data);
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

  const validateBlog = (name, value) => {
    switch (name) {
      case "title":
      case "shortContent": {
        if (value.length < 5) {
          setValidationState(name, true, "Minimum 5 character are required!");
        } else {
          setValidationState(name, false, "");
        }
        break;
      } //title, shortContent

      case "content": {
        if (value.length < 5) {
          setValidationState(name, true, "Minimum 5 character are required!");
        } else {
          setValidationState(name, false, "");
        }
        break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
    validateBlog(name, value);
  };

  const handleSubmit = () => {
    if (!blog.title) {
      setValidationState("title", true, "Title is required");
    } else if (!blog.shortContent) {
      setValidationState("shortContent", true, "shortContent is required");
    } else if (!blog.content) {
      setValidationState("content", true, "content is required");
    } else {
      if (op == "edit" && userObj.role == "admin") {
        let finalData = { ...blog };
        finalData = { ...finalData, ["updatedBy"]: userObj._id };
        BlogService.updateBlog(finalData, id)
          .then((response) => {
            Swal.fire("Blog Updated", "The blog is updated", "success");
            history.goBack();
          })
          .catch((err) => {
            Swal.fire(
              "Blog not updated",
              "The blog could not updated",
              "error"
            );
          });
      } else {
        let finalData = { ...blog };
        finalData = {
          ...finalData,
          ["updatedBy"]: userObj._id,
          ["createdBy"]: userObj._id,
        };
        BlogService.createBlog(finalData)
          .then((response) => {
            Swal.fire("Blog Created", "The blog is created", "success");
            history.goBack();
          })
          .catch((err) => {
            Swal.fire(
              "Blog not created",
              "The blog is could not be created",
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
            {op == "edit" ? "Edit" : "Add"} Blog
          </h1>
          <Grid container spacing={3}>
            {[
              {
                label: "Title",
                name: "title",
                type: "text",
              },
              {
                label: "Short Content",
                name: "shortContent",
                type: "text",
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
                    value={blog[field.name] ? blog[field.name] : ""}
                    autoComplete={field.name}
                    onChange={handleChange}
                    error={validate[field.name]}
                    helperText={errorMessage[field.name]}
                  />
                </Grid>
              );
            })}
            <Grid item xs={12} sm={12}>
              <TextField
                id="outlined-multiline-static"
                label="Content"
                multiline
                rows={10}
                fullWidth
                value={blog.content}
                onChange={handleChange}
                name="content"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="role">Status</InputLabel>
                <Select
                  native
                  fullWidth
                  label="Status"
                  disabled={userObj.role == "admin" ? false : true}
                  value={blog.status}
                  inputProps={{
                    name: "status",
                    id: "status",
                  }}
                  onChange={handleChange}
                >
                  <option value="1">Approved</option>
                  <option value="0">Pending</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Divider />
              {userObj.role != "admin" && op == "edit" ? (
                ""
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={handleSubmit}
                >
                  {op == "edit" ? "Update" : "Create"}
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default AddEditBlog;
