import { applyMiddleware, createSlice } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk";

// import { ActionTypes } from "../constants/action_types"

const initialState = {
    admin_details: [],
    selected_user:null,
}

const suggestedUsersInitialState = {
    suggested_users: []
};

// admin slice
const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setAuthUser: (state, action) => {
            state.admin_details = action.payload;
        },
        removeAuthUser:async (state) => {
            state.admin_details = null;
        },
        setSelectedUser: (state, action) => {
            state.selected_user = action.payload;
        },
        removeSelectedUser: (state) => {
            state.selected_user = null;
        }
    },

    extraReducers: (builder) => {
        // Add any additional reducers here
    }
},applyMiddleware(thunk));

// Suggested Users Slice
const suggestedUsersSlice = createSlice({
    name: "suggestedUsers",
    initialState: suggestedUsersInitialState,
    reducers: {
        setSuggestedUsers: (state, action) => {
            state.suggested_users = action.payload;
        },
        removeSuggestedUsers: (state) => {
            state.suggested_users = [];
        }
    },
    extraReducers: (builder) => {
        // Add any additional reducers here
    }
});


export const { setAuthUser, removeAuthUser,setSelectedUser,removeSelectedUser } = authSlice.actions;
export const { setSuggestedUsers, removeSuggestedUsers } = suggestedUsersSlice.actions;
export const authReducer = authSlice.reducer;
export const suggestedUsersReducer = suggestedUsersSlice.reducer;
