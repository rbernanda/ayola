import {useState} from 'react';
import {useAuthStore} from '~/store';

import {TCurrentUser} from '~/types';

type UserLoginFormErrors = {
  username: null | string;
  password: null | string;
};

const useLoginForm = () => {
  const {login, users} = useAuthStore();

  const [errors, setErrors] = useState<UserLoginFormErrors>({
    username: null,
    password: '',
  });
  const [values, setValues] = useState<TCurrentUser>({
    username: '',
    password: '',
  });

  const onChangeUsername = (text: string) => {
    setErrors(prev => ({...prev, username: null}));
    setValues(prev => ({...prev, username: text}));
  };

  const onChangePassword = (text: string) => {
    setErrors(prev => ({...prev, password: null}));
    setValues(prev => ({...prev, password: text}));
  };

  const onSubmit = () => {
    const mapErrors: UserLoginFormErrors = {
      username: null,
      password: null,
    };

    const foundUser = users.find(
      u => u.username.toLowerCase() === values.username.toLowerCase(),
    );

    if (!foundUser || foundUser.password !== values.password) {
      mapErrors.password = 'Invalid username or password';
      mapErrors.username = 'Invalid username or password';
    }

    const hasError = Object.values(mapErrors).some(v => v !== null);

    if (hasError) {
      setErrors({...mapErrors});
      return;
    }
    /**
     * Don't Manually navigate navigate when conditionally rendering screen
     * source: https://reactnavigation.org/docs/auth-flow#dont-manually-navigate-when-conditionally-rendering-screens
     */
    if (foundUser) {
      login(foundUser);
    }
  };

  const disableSubmit = Object.values(values).some(v => !v);

  return {
    errors,
    values,
    onChangePassword,
    onChangeUsername,
    onSubmit,
    disableSubmit,
  };
};

export default useLoginForm;
