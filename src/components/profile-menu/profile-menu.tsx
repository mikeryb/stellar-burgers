import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import { logoutThunk } from '../../slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutThunk())
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
