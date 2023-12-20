import {create} from 'zustand';
import {TBaseUser, TCurrentUser} from '~/types';

type AuthState = {
  user: null | TCurrentUser;
  users: TBaseUser[]; // in-memory database
  otp: null | string;
  login: (user: TCurrentUser) => void;
  register: (user: TBaseUser) => void;
  logout: () => void;
  sendOTP: () => void;
  currentRegisteringUser: null | TBaseUser;
  setCurrentRegisteringUser: (user: TBaseUser) => void;
  resetCurrentRegisteringUser: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  users: [],
  otp: null,
  login: (user: TCurrentUser) => set({user: user}),
  register: (user: TBaseUser) =>
    set(state => ({users: [...state.users, user]})),
  logout: () => set({user: null}),
  sendOTP: () => set({otp: '111111'}),
  currentRegisteringUser: null,
  setCurrentRegisteringUser: (user: TBaseUser) =>
    set({currentRegisteringUser: user}),
  resetCurrentRegisteringUser: () => set({currentRegisteringUser: null}),
}));
