import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { isAuthSelector, userSelector } from '../../slices/userSlice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children?: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(userSelector);
  const isAuth = useSelector(isAuthSelector);
  const location = useLocation();

  if (!isAuth) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state ?? { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
