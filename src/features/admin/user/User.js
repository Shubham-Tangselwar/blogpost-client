import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import AddEditUser from "./AddEditUser";
import UserList from "./UserList";
import PageNotFound from "../../../ui/pageNotFound/PageNotFound";
const Users = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}`} exact>
          <UserList />
        </Route>
        <Route path={`${path}/addEditUser/:id/:op`}>
          <AddEditUser />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Users;
