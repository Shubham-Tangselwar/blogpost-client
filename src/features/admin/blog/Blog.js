import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import AddEditBlog from "./AddEditBlog";
import BlogList from "./BlogList";
import PageNotFound from "../../../ui/pageNotFound/PageNotFound";
const Blog = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}`} exact>
          <BlogList />
        </Route>
        <Route path={`${path}/addEditblog/:id/:op`}>
          <AddEditBlog />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Blog;
