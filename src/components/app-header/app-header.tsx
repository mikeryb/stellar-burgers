import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState, AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName } from '../../slices/userSlice';


export const AppHeader: FC = () => {
  const user = useSelector<RootState, string | undefined>(selectUserName);
  return (<AppHeaderUI userName={user} />)
}
