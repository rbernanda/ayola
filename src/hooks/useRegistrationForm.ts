import {useState} from 'react';
import {useAuthStore} from '~/store';
import {validateEmail, validatePassword} from '~/shared/utilities';

import {TBaseUser} from '~/types';

type UserRegistrationFormErrors = {
  email: string | null;
  username: string | null;
  password: string | null;
};

const useRegistrationForm = () => {
  const {setCurrentRegisteringUser, sendOTP, users} = useAuthStore();

  const [errors, setErrors] = useState<UserRegistrationFormErrors>({
    email: null,
    username: null,
    password: null,
  });

  const [values, setValues] = useState<TBaseUser>({
    email: '',
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

  const onChangeEmail = (text: string) => {
    setErrors(prev => ({...prev, email: null}));
    setValues(prev => ({...prev, email: text}));
  };

  const onSubmit = () => {
    const mapErrors: UserRegistrationFormErrors = {
      username: null,
      email: null,
      password: null,
    };

    if (!validateEmail(values.email)) {
      mapErrors.email = 'Invalid email address';
    }

    if (!values.username) {
      mapErrors.username = 'Username should be filled';
    } else if (
      users.find(
        u => u.username.toLowerCase() === values.username.toLowerCase(),
      )
    ) {
      mapErrors.username = 'Username already registered';
    }

    if (!validatePassword(values.password)) {
      mapErrors.password =
        'Password must contain at least 8 characters, a lowercase letter, an uppercase letter, a symbol';
    }

    const hasError = Object.values(mapErrors).some(v => v !== null);

    if (hasError) {
      setErrors({...mapErrors});
      return false;
    }

    setCurrentRegisteringUser(values);
    sendOTP();
    return true;
  };

  const disableSubmit = Object.values(values).some(v => !v);

  return {
    values,
    errors,
    onChangeUsername,
    onChangePassword,
    onChangeEmail,
    onSubmit,
    disableSubmit,
  };
};

export default useRegistrationForm;
