import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIsAuthChecked,
  selectUser
} from '../../services/slices/user/slice';
import { Preloader } from '@ui';
import { TProtectedRouteProps } from './type';

const ProtectedRoute = ({
  onlyUnAuth = false,
  component
}: TProtectedRouteProps): JSX.Element => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({
  component
}: {
  component: JSX.Element;
}): JSX.Element => <ProtectedRoute onlyUnAuth component={component} />;
