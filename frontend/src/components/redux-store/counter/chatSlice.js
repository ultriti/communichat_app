import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onlineUsers: [],
    messages:[]
};

const onlineUsersSlice = createSlice({
    name: "onlineUsers",
    initialState,
    reducers: {
        setonlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        },
        setMessages:(state,action)=>{
            state.messages = action.payload;
        }
    }
})

export const { setonlineUsers,setMessages } = onlineUsersSlice.actions;
export default onlineUsersSlice.reducer;