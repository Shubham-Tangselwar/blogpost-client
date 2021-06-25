import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "../../shared/routes/FrontendRoutes";
import Header from "../../ui/header/Header";
const BlankLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<h3>Loading ...</h3>}>
        <Switch>
          {Array.isArray(routes) &&
            routes.map((route, i) => {
              return (
                <Route
                  key={i + route.title}
                  path={route.path}
                  exact={route.path == "/" ? true : false}
                >
                  {route.component}
                </Route>
              );
            })}
        </Switch>
      </Suspense>
    </>
  );
};

export default BlankLayout;
