import { createSlice } from '@reduxjs/toolkit'

const initialState = 
{
    access: '',
    user:{}
}


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        setLogin: (state, action) => {
            state.access = action.payload.access
            state.user = action.payload.user
            console.log('Actualizar:'+state.access);
        },
        deleteLogout: (state, action) => {
            console.log(action);
        }
    }
});

export const { setLogin, deleteLogout} = loginSlice.actions;
export default loginSlice.reducer;