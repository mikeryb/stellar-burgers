import React, { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { useLocation } from 'react-router';
import { setCookie, getCookie } from '../../utils/cookie';
import { Preloader } from '@ui';


interface ProtectedRouteProps {
  children: ReactNode;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}) => {
  const { isInit, user } = useAppSelector((store: RootState) => store.user);
    const location = useLocation();



  useEffect(() => {}, [onlyUnAuth, user, isInit]);

  if (isInit) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
        return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    const from  = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
