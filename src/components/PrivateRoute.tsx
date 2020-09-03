import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import firebase from "../constants/Firebase";
import history from "../utils/historyUtils";

interface PrivateRouteProps {
  path: string;
  component: any;
  key: string;
}

export default function PrivateRoute({
  path,
  component,
  key,
}: PrivateRouteProps) {
  useEffect(() => {
    setTimeout(() => {
      if (!firebase.auth().currentUser) {
        history.push("/not-logged-in");
      }
    }, 0);
  }, []);
  return <Route path={path} component={component} key={key} />;
}
