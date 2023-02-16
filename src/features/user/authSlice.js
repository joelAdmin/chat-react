import { createSlice } from '@reduxjs/toolkit'

const initialState = 
{
    access: '',
    userAuth:{}
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setLogin: (state, action) => {
            state.access = action.payload.access
            state.userAuth = action.payload.userAuth
        },
        deleteLogout: (state, action) => {
            console.log(action);
        }
    }
});

export const { setLogin, deleteLogout} = authSlice.actions;
export default authSlice.reducer;