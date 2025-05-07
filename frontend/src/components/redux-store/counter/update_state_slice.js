import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    isupdated:'',
}

const updateSlice = createSlice({
    name: 'is_updated',
    initialState,

    reducers:{
        setUpdate(state,action){
            state.uploads = action.payload;
        },
    }
})

export const { setUpdate } = updateSlice.actions;
export default updateSlice.reducer;