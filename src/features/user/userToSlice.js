import { createSlice } from '@reduxjs/toolkit'

const initialState = 
{
    infoUserTo:{}
}


const userToSlice = createSlice({
    name: 'userTo',
    initialState,
    reducers:{
        infoUserTo:(state, action) => {
            state.infoUserTo = action.payload
        }
    }
});

export const {infoUserTo} = userToSlice.actions;
export default userToSlice.reducer;