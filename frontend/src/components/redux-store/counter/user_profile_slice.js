import { applyMiddleware, createSlice } from "@reduxjs/toolkit"
import { Await } from "react-router-dom";
import { thunk } from "redux-thunk";

// import { ActionTypes } from "../constants/action_types"

const initialState = {
    user_profile_details: [{}]
}

const user_profile_Slice = createSlice({
    name: "user_profile",
    initialState,

    reducers: {
        setUser_profile: (state, action) => {
            state.user_profile_details = action.payload;
        },
    },

},applyMiddleware(thunk));

export const { setUser_profile } = user_profile_Slice.actions;
export default user_profile_Slice.reducer;
