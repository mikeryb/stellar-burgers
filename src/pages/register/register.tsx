import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { RootState, AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { TRegisterData } from '@api';
import { registerUserThunk, selectError } from '../../slices/userSlice';




export const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector<RootState, string>(selectError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
       const formData: TRegisterData = {
      email: email,
      name: userName,
      password: password ,
    };
    dispatch(registerUserThunk(formData));
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
