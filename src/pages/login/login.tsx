import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { RootState, AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk, selectError } from '../../slices/userSlice';
import { TLoginData } from '@api'; 
import { useLocation } from 'react-router';
import {Outlet, Navigate} from 'react-router-dom';
import { Preloader } from '../../components/ui';

export const Login: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector<RootState, string>(selectError);
  const {isInit, isLoading } = useSelector((store: RootState) => store.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData: TLoginData = {
          email: email,
          password: password
        };
        dispatch(loginUserThunk(formData));
  };
  if (isLoading) {
    return <Preloader />
  }
  return (
    <LoginUI
      errorText={ error }
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
