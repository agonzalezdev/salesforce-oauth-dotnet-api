import { useEffect, useState } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { useAuth } from '../services/authContext';

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const ProtectedRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const { user, checkLogin, logout } = useAuth();

  useEffect(() => {
    checkLogin();
  }, [user, checkLogin])

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user ? (
          <Component {...routeProps} />
        ) :
          (user === null ? <></>
            :
            <Redirect
              to={{
                pathname: '/',
                state: { from: routeProps.location }
              }}
            />
          )
      }
    />
  );
};

export default ProtectedRoute