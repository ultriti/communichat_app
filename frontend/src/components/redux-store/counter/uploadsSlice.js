import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    uploads:[],
    uplaods_bol:false
}

const uploadsSlice = createSlice({
    name: 'uploads',
    initialState,

    reducers:{
        setUpload(state,action){
            state.uploads = action.payload;
        },
        chnage_bool(state,action){
            state.uplaods_bol = action.payload;
        },
    }
})

export const { setUpload,chnage_bool } = uploadsSlice.actions;
export default uploadsSlice.reducer;