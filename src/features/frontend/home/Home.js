import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import BlogService from "../../../services/BlogService";
import BlogCard from "../../../ui/card/BlogCard";
const Home = () => {
  const useStyle = makeStyles((theme) => ({
    mainFeaturedPost: {
      position: "relative",
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: "url(./images/blogHeader.jpg)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,.3)",
    },
    mainFeaturedPostContent: {
      position: "relative",
      padding: theme.spacing(3),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
  }));

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    await BlogService.getAllBlogs()
      .then((res) => {
        const data = res.data.data;
        setBlogs(data.filter((data) => data.status == 1));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const classes = useStyle();
  return (
    <>
      <Paper
        className={classes.mainFeaturedPost}
        style={{ backgroundImage: `url(./images/blogHeader.jpg)` }}
      >
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {`Express Your Mind Here`}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {`Start Today.`}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <h2 style={{ textAlign: "center" }}>Recent Blogs</h2>
      <Grid container spacing={2}>
        {blogs &&
          blogs.map((data, i) => {
            return (
              <Grid item xs={12} sm={3}>
                <BlogCard data={data} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default Home;
