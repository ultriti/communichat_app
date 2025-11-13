import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer, suggestedUsersReducer } from "./counter/authSlice.js"
import uploadsSlice from './counter/uploadsSlice.js'
import user_profile_Slice from './counter/user_profile_slice.js'
import is_connected from './counter/connect-disconnect.js'
import socketSlice from './counter/socketSlice.js'
import chatSlice from './counter/chatSlice.js'
import rtnSlice from './counter/rtnSlice.js'
import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers(
  {
    auth: authReducer,
    uploads: uploadsSlice,
    update: uploadsSlice,
    is_connected: is_connected,
    userProfile: user_profile_Slice,
    socketio: socketSlice,
    onlineUsers: chatSlice,
    suggestedUsers: suggestedUsersReducer,
    rtnLikeNotification: rtnSlice


  }
)

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActions: [PERSIST],
        serializableCheck: false,
      },
    }),
})

export default store;


// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { authReducer, suggestedUsersReducer } from './counter/authSlice.js'
// import uploadsSlice from './counter/uploadsSlice.js'
// import user_profile_Slice from './counter/user_profile_slice.js'
// import is_connected from './counter/connect-disconnect.js'
// import socketSlice from './counter/socketSlice.js'
// import chatSlice from './counter/chatSlice.js'
// import rtnSlice from './counter/rtnSlice.js'

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// // 🔐 Persist config
// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// }

// // 🧠 Root reducer
// const rootReducer = combineReducers({
//   auth: authReducer,
//   uploads: uploadsSlice,
//   is_connected: is_connected,
//   userProfile: user_profile_Slice,
//   socketio: socketSlice,
//   onlineUsers: chatSlice,
//   suggestedUsers: suggestedUsersReducer,
//   rtnLikeNotification: rtnSlice,
// })

// // 🧊 Persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer)

// // 🛠 Store setup with scoped serializable check
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           FLUSH,
//           REHYDRATE,
//           PAUSE,
//           PERSIST,
//           PURGE,
//           REGISTER,
//           'socketio/setSocket', // ✅ ignore socket action
//         ],
//         ignoredPaths: ['socketio.socket'], // ✅ ignore socket state
//       },
//     }),
// })

// export default store
// export const persistor = persistStore(store)
