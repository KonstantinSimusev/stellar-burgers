import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { fetchLoginUser } from '../../services/slices/user/actions';
import {
  selectIsloading,
  selectLoginError
} from '../../services/slices/user/slice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsloading);
  const errorText = useSelector(selectLoginError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchLoginUser({
        email,
        password
      })
    );
  };

  if (isLoading && !errorText) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={errorText?.message}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
