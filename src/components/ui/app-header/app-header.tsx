import React, { FC, useEffect, useState } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import { useLocation } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';



export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

const [path, setPath] = useState<string>('primary')
const identifyPath = (): void => {
  if (location.pathname.startsWith('/feed')) {
    setPath('feed')
  } else if (location.pathname.startsWith('/profile')){
    setPath('profile')
  } else if (!location.pathname.startsWith('/login') 
    && !location.pathname.startsWith('/register') 
    && !location.pathname.startsWith('/forgot-password')
    && !location.pathname.startsWith('/reset-password')) {
    setPath('constructor')  
  } else setPath('')
};

useEffect(() => {
  identifyPath();
},[location])

  return(
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={path === 'constructor' ? 'success' :'primary'} />
         <Link to='/'> <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p></Link>
        </>
        <>
          <ListIcon type={path === 'feed'? 'success' : 'primary'} />
         <Link to='/feed'> <p className='text text_type_main-default ml-2'>Лента заказов</p></Link>
        </>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon type={path === 'profile'? 'success' : 'primary'} />
        <Link to='/profile'><p className='text text_type_main-default ml-2'>
          {userName || 'Личный кабинет'}
        </p></Link>
      </div>
    </nav>
  </header>
);}
