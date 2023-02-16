import { createSlice } from '@reduxjs/toolkit'

const initialState = 
{
    getConversation:{}
}


const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers:{
        getConversation:(state, action) => {
            state.getConversation = action.payload
        }
    }
});

export const {getConversation} = conversationSlice.actions;
export default conversationSlice.reducer;