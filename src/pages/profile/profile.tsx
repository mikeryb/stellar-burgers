import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { selectUser, editUserThunk } from '../../slices/userSlice';
import {RootState, AppDispatch} from '../../store';
import { TUser } from '@utils-types';
import { Preloader } from '@ui';


export const Profile: FC = () => {

  const dispatch = useDispatch<AppDispatch>();


  const userData = useSelector<RootState, TUser | null >(selectUser);
  const isLoading  = useSelector((store: RootState) => store.user.isLoading);
  const user = userData? userData : {
    name: '',
    email: ''
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [userData]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(editUserThunk(formValue))
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return ( isLoading? <Preloader /> :
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
