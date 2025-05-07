import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isConnected: `${Boolean}`,
    user_follower_count: '',

}

const isconnected = createSlice({
    name: 'isConnected',
    initialState,

    reducers: {
        checkConnected(state, action) {
            state.isConnected = action.payload;
        },
        add_follower_(state, action) {
            state.user_follower_count = action.payload;
        },
    }
})

export const { checkConnected,add_follower_ } = isconnected.actions;
export default isconnected.reducer;