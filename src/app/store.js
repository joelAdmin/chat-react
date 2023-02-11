import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/user/loginSlice';

export const store = configureStore({
  reducer: {login:loginReducer},
})