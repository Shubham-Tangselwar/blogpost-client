import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import FullLayout from "./layouts/full/FullLayout";
import BlankLayout from "./layouts/blank/BlankLayout";
import AuthService from "./services/AuthService";
import { selectUser, addUser } from "./slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const SecuredRoute = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userObj = useSelector(selectUser);
    const [isAuthenticated, setAuthenticated] = useState(true);
    useEffect(() => {
      if (!sessionStorage.getItem("token")) setAuthenticated(false);
      else
        AuthService.refreshToken()
          .then((res) => {
            console.log("user-", res.data);
            sessionStorage.setItem("token", res.headers["x-token"]);
            dispatch(addUser(res.data.data));
          })
          .catch((err) => {
            history.push("/login");
          });
    }, []);

    if (isAuthenticated) {
      return <Route path={props.path}>{props.children}</Route>;
    } else {
      return <Redirect to="/" />;
    }
  };
  return (
    <>
      <Switch>
        <SecuredRoute path="/secured">
          <FullLayout />
        </SecuredRoute>
        <Route path="/">
          <BlankLayout />
        </Route>
      </Switch>
    </>
  );
}

export default App;
