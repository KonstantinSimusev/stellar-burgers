import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectIsloading,
  selectRegisterError
} from '../../services/slices/user/slice';
import { fetchRegisterUser } from '../../services/slices/user/actions';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsloading);
  const errorText = useSelector(selectRegisterError);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchRegisterUser({
        name: userName,
        email,
        password
      })
    );
  };

  if (isLoading && !errorText) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={errorText?.message}
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
