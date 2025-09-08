import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Modal, OrderInfo, IngredientDetails } from '../';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AppHeader } from '@components';
import { RootState, AppDispatch } from '../../store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ProtectedRoute } from '../ProtectedRoute';
import { checkUserAuth, selectUser } from '../../slices/userSlice';
import { useLocation } from 'react-router';
import {
  fetchFeeds,
  getMyOrdersThunk,
  refreshOrders
} from '../../slices/orderSlice';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const REFRESH_INTERVAL = 5000;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
    dispatch(fetchFeeds());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getMyOrdersThunk());
    }
    const interval = setInterval(() => {
      dispatch(refreshOrders(user));
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [user]);

  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={''}
                onClose={function (): void {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={''}
                onClose={function (): void {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={''}
                  onClose={function (): void {
                    navigate(-1);
                  }}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
