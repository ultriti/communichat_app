import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rtnLikeNotification_: [],
};

const rtnSlice = createSlice({
    name: "rtnLikeNotification",
    initialState,
    reducers: {
        setLikeNotification: (state, action) => {
            if (action.payload.type === 'like') {
                
                if(state.rtnLikeNotification_){
                   
                    // if(!isExist){
                        state.rtnLikeNotification_.push(action.payload);
                    // }
                }else{
                    state.rtnLikeNotification_ = action.payload;
                }

            } else if (action.payload.type === 'dislike') {
                state.rtnLikeNotification_ = state.rtnLikeNotification_.filter((item) => item.userId !== action.payload.userID)
            }
        },
        removelikeNotification(state) {
            state.rtnLikeNotification_ = [];
        },
    }
}
)

export const { setLikeNotification,removelikeNotification } = rtnSlice.actions;
export default rtnSlice.reducer;