import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Application_download_page from './components/User_pages/application_download_page'
import User_home_page from './components/User_pages/User_home_page'
import User_signup_page from './components/User_pages/User_signup_page'
import User_scearch_page from './components/User_pages/User_scearch_page'
import App_profile_page from './components/application interface/profile page comp/App_profile_page'
import Demo_upload from './components/User_pages/demo_upload'
import UserContext from './Contexts/UserContext'
import User_logout_page from './components/User_pages/user_logout_page.jsx'
import App_post_uploads_temp from './components/application interface/create content comp/App_post_uploads_temp'
import App_thoughts_page from './components/application interface/thoughts page comp/App_thoughts_page'
import App_post_thoughts from './components/application interface/create content comp/App_post_thoughts.jsx'
import App_message_page from './components/application interface/messages content comp/App_message_page.jsx'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import store from './components/redux-store/store.js'
import { setSocket } from './components/redux-store/counter/socketSlice.js'
import { setonlineUsers } from './components/redux-store/counter/chatSlice.js'
import PageNotFound from './components/common_Routes/PageNotFound.jsx'
import UserWrapperContext from './Contexts/UserWrapperContext.jsx'
import { removelikeNotification, setLikeNotification } from './components/redux-store/counter/rtnSlice.js'
import { _removeLinkedListItem } from 'gsap/gsap-core.js'

const App = () => {
  const { admin_details } = useSelector(store => store.auth)
  const { socket } = useSelector(store => store.socketio)
  const { rtnLikeNotification_ } = useSelector((state) => state.rtnLikeNotification);

  const dispatch = useDispatch()

  useEffect(() => {
    if (admin_details) {
      const socketio = io('http://localhost:3000', {
        query: {
          userId: admin_details?.userId
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUser', (onlineusers) => {
        dispatch(setonlineUsers(onlineusers))
      });

      socketio.on('notification', (notification) => {
      
          
          
          dispatch(setLikeNotification(notification))

      })

      return () => {
        socketio.close();
        dispatch(setSocket(null))
      }


    } else if (socket) {
      socket.close();
      dispatch(setSocket(null))
    }

  }, [admin_details, dispatch])


  return (
    <div>

      <Routes>

        <Route path='*' element={<PageNotFound />} />


        <Route path='/' element={<UserWrapperContext><UserContext><User_home_page /></UserContext></UserWrapperContext>} />
        <Route path='/users/home' element={<UserWrapperContext><UserContext><User_home_page /></UserContext></UserWrapperContext>} />
        <Route path='/users/search' element={<User_scearch_page />} />
        <Route path='/users/register' element={<><User_signup_page /></>} />
        <Route path='/users/thoughts' element={<><App_thoughts_page /></>} />
        <Route path='/users/profile/:id' element={<><UserContext><App_profile_page /></UserContext></>} />

        <Route path='/users/demo' element={<><Demo_upload /></>} />
        <Route path='/users/logout' element={<><User_logout_page /></>} />
        <Route path='/users/post_uploads' element={<><App_post_uploads_temp /></>} />
        <Route path='/users/post_thoughts' element={<><App_post_thoughts /></>} />

        <Route path='/users/message' element={<><UserWrapperContext><UserContext><App_message_page /></UserContext></UserWrapperContext></>} />


      </Routes>


    </div>
  )
}

export default App
