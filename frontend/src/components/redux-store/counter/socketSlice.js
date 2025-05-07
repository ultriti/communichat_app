import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socket: null
};

const socketSLice = createSlice({
    name: "socketio",
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
    }
}
)

export const { setSocket } = socketSLice.actions;
export default socketSLice.reducer;