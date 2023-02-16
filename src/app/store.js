import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/user/authSlice';
import chatReducer from '../features/user/chatSlice';
import conversationReducer from '../features/user/conversationSlice';
import userToReducer from '../features/user/userToSlice';

export const store = configureStore({
  reducer: {
    auth:authReducer, 
    chat:chatReducer,
    conversation:conversationReducer,
    userTo:userToReducer,
  },
})