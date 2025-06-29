import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector, loginUser } from '@services';

export const Login: FC = () => {
  const { isAuthenticated, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) return;
    dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return (
    <LoginUI
      errorText={error?.message || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
