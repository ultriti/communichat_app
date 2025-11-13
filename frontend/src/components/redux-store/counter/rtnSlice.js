import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rtnLikeNotification_: [],
};

const rtnSlice = createSlice({
    name: "rtnLikeNotification",
    initialState,
    reducers: {
        setLikeNotification: (state, action) => {

            console.log('----> notification', action.payload, "\n", action.payload.rtn);

            // if (action.payload.rtn.length > 0) {
            //     console.log('----> rtn', action.payload, "\n", action.payload.rtn.includes(action.payload.notification.PostId));
            // }

            console.log('----> action.payload.notification.PostId', action.payload.notification.PostId);
            // console.log(action.payload.notification.type);


            if (action.payload.notification.type === 'like') {


                if (state.rtnLikeNotification_) {

                    console.log('-->action.payload.rtn.length', action.payload.rtn.length);

                    if (action.payload.rtn.length > 0) {

                        console.log(
                            '!action.payload.rtn.includes(notification.PostId)',
                            action.payload.rtn.some(item => item.PostId === action.payload.notification.PostId)
                        );
                        console.log('action.payload.rtnaction.payload.rtn', action.payload.rtn, action.payload.notification.PostId)

                        if (action.payload.rtn.some(item => item.PostId === action.payload.notification.PostId) == false) {

                            state.rtnLikeNotification_.push(action.payload.notification);

                        } else {
                            console.log('else -> else -> else -> else -> alredy in there');

                            // state.rtnLikeNotification_ = action.payload;
                        }

                    } else {
                        state.rtnLikeNotification_.push(action.payload.notification);
                    }

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

export const { setLikeNotification, removelikeNotification } = rtnSlice.actions;
export default rtnSlice.reducer;