import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
// import * as S from "./styled";

const ProtectedRoute = ({ component: Component, render, ...restProps }) => {
  const { admin } = useSelector((state) => state.admin);
  return (
    <Route
      {...restProps}
      render={(props) => {
        if (admin) {
          if (render) return render(props);
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
