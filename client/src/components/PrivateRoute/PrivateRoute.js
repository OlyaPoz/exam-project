import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const PrivateRoute = ({ roles, ...rest }) => {
  const { user, isFetching } = useSelector(state => state.auth);

  if (isFetching) {
    return <Spinner />;
  }

  if (user) {
    if (roles && !roles.includes(user.role)) {
      return <Redirect to='/' />;
    }
    return <Route {...rest} />;
  }
  return <Redirect to='/login' /> // TODO: FIX null render while no refresh token
};

export default PrivateRoute;
