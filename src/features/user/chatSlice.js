import { createSlice } from '@reduxjs/toolkit'

const initialState = 
{
    openChat:{},
    getChatsUser:{},
    getChatsMaster:{},
    getSubChatsMaster:{},
    loading:false,
    getCollapseChat:{}
}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{
        openChat:(state, action) => {
            state.openChat = action.payload
        },
        loading:(state, action) => {
            state.loading = action.payload
        },
        getChatsUser:(state, action) => {
            state.getChatsUser = action.payload
        },
        getChatsMaster:(state, action) => {
            state.getChatsMaster = action.payload
        },
        getCollapseChat:(state, action) => {
            state.getCollapseChat = action.payload
        },
        getSubChatsMaster:(state, action) => {
            state.getSubChatsMaster = action.payload
        },
    }
});

export const {loading, openChat, getChatsUser, getChatsMaster, getSubChatsMaster, getCollapseChat} = chatSlice.actions;
export default chatSlice.reducer;