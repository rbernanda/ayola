export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  OTP: undefined;
};

export type TBaseUser = {
  email: string;
  username: string;
  password: string;
};

export type TCurrentUser = Omit<TBaseUser, 'email'>;
