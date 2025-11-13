import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './components/redux-store/counter/socketSlice.js'
import { setMessage, setMessages, setonlineUsers } from './components/redux-store/counter/chatSlice.js'
import { setLikeNotification } from './components/redux-store/counter/rtnSlice.js'
// import {socket} from './socket/Socket_io' // ✅ use your shared socket instance
import { getSocket } from './socket/Socket_io';


// Pages and wrappers
import User_home_page from './components/User_pages/User_home_page'
import User_signup_page from './components/application interface/Auth pages/User_signup_page.jsx'
import User_scearch_page from './components/User_pages/User_scearch_page'
import App_profile_page from './components/application interface/profile page comp/App_profile_page'
import Demo_upload from './components/User_pages/demo_upload'
import User_logout_page from './components/application interface/Auth pages/User_logout_page.jsx'
import App_post_uploads_temp from './components/application interface/create content comp/App_post_uploads_temp'
import App_thoughts_page from './components/application interface/thoughts page comp/App_thoughts_page'
import App_post_thoughts from './components/application interface/create content comp/App_post_thoughts.jsx'
import App_message_page from './components/application interface/messages content comp/App_message_page.jsx'
import PageNotFound from './components/common_Routes/PageNotFound.jsx'
import UserContext from './Contexts/UserContext'
import UserWrapperContext from './Contexts/UserWrapperContext.jsx'
import RegisterForm from './components/application interface/Auth pages/RegisterPage.jsx'
import LoginPage from './components/application interface/Auth pages/LoginPage.jsx'

import Cookies from 'js-cookie';



const App = () => {

  const token = Cookies.get('token');
  console.log('Token from cookie:', token);

  const dispatch = useDispatch()
  const { admin_details } = useSelector(store => store.auth)
  const { rtnLikeNotification_ } = useSelector((state) => state.rtnLikeNotification);

  const [deviceType, setDeviceType] = useState('desktop');

  // useEffect(() => {
  //   if (admin_details) {
  //     // ✅ Attach userId to existing socket instance
  //     socket.io.opts.query = { userId: admin_details.userId }

  //     socket.connect()

  //     dispatch(setSocket(socket))

  //     // ✅ Listen to events
  //     socket.on('getOnlineUser', (onlineusers) => {
  //       dispatch(setonlineUsers(onlineusers))
  //     })

  //     socket.on('notification', (notification) => {
  //       const noti= {
  //         notification,
  //         rtn: rtnLikeNotification_
  //       }
  //       dispatch(setLikeNotification(noti))
  //     })


  //     socket.on('newMessage', (newMessage) => {
  //      console.log('newMessage',newMessage);
  //     })


  //     return () => {
  //       socket.off('getOnlineUser')
  //       socket.off('notification')
  //       socket.off('newMessage')
  //       socket.disconnect()
  //       dispatch(setSocket(null))
  //       dispatch(setMessages(null))
  //       dispatch(setMessage(null))
  //     }
  //   }
  // }, [admin_details, rtnLikeNotification_])

  useEffect(() => {
    if (!admin_details) return;

    const initSocket = async () => {
      const socket = await getSocket();

      socket.io.opts.query = { userId: admin_details.userId };
      if (!socket.connected && socket.disconnected) socket.connect();

      dispatch(setSocket(socket));

      const handleOnlineUsers = (onlineusers) => dispatch(setonlineUsers(onlineusers));
      const handleNotification = (notification) =>
        dispatch(setLikeNotification({ notification, rtn: rtnLikeNotification_ }));
      const handleNewMessage = (newMessage) => {
        console.log('newMessage', newMessage);
        dispatch(setMessage(newMessage));
      };

      socket.on('getOnlineUser', handleOnlineUsers);
      socket.on('notification', handleNotification);
      socket.on('newMessage', handleNewMessage);

      return () => {
        socket.off('getOnlineUser', handleOnlineUsers);
        socket.off('notification', handleNotification);
        socket.off('newMessage', handleNewMessage);
        socket.disconnect();
        dispatch(setSocket(null));
        dispatch(setMessages(null));
        dispatch(setMessage(null));
      };
    };

    initSocket();
  }, [admin_details, rtnLikeNotification_, dispatch]);

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setDeviceType(isMobile ? 'mobile' : 'desktop');

    if (isMobile) {
      console.log("isMobile")
    } else {
      console.log("laptop")
    }
    console.log(deviceType);
    const userAgent = navigator.userAgent;
    console.log("User Agent:", userAgent);

  }, [])



  return (
    <div>




      {
        deviceType == "desktop" ? (
          // desktop routes 
          <Routes>
            <Route path='*' element={<PageNotFound />} />

            < Route path='/' element={<UserWrapperContext><UserContext><LoginPage /></UserContext></UserWrapperContext>} />
            <Route path='/users/home' element={<UserWrapperContext><UserContext><User_home_page /></UserContext></UserWrapperContext>} />
            <Route path='/users/search' element={<User_scearch_page />} />

            <Route path='/users/register' element={< RegisterForm />} />
            <Route path='/users/Login' element={< LoginPage />} />

            <Route path='/users/thoughts' element={<App_thoughts_page />} />
            <Route path='/users/profile/:id' element={<UserContext><App_profile_page /></UserContext>} />
            <Route path='/users/demo' element={<Demo_upload />} />
            <Route path='/users/logout' element={<User_logout_page />} />
            <Route path='/users/post_uploads' element={<App_post_uploads_temp />} />
            <Route path='/users/post_thoughts' element={<App_post_thoughts />} />
            <Route path='/users/message' element={<UserWrapperContext><UserContext><App_message_page /></UserContext></UserWrapperContext>} />
          </Routes>

        ) : (

          < Routes >
            <Route path='*' element={<PageNotFound />} />

            < Route path='/' element={<UserWrapperContext><UserContext><User_home_page /></UserContext></UserWrapperContext>} />
            <Route path='/users/home' element={<UserWrapperContext><UserContext><User_home_page /></UserContext></UserWrapperContext>} />
            <Route path='/users/search' element={<User_scearch_page />} />

            <Route path='/users/register' element={<RegisterForm />} />
            <Route path='/users/Login' element={< LoginPage />} />

            <Route path='/users/thoughts' element={<App_thoughts_page />} />
            <Route path='/users/profile/:id' element={<UserContext><App_profile_page /></UserContext>} />
            <Route path='/users/demo' element={<Demo_upload />} />
            <Route path='/users/logout' element={<User_logout_page />} />
            <Route path='/users/post_uploads' element={<App_post_uploads_temp />} />
            <Route path='/users/post_thoughts' element={<App_post_thoughts />} />
            <Route path='/users/message' element={<UserWrapperContext><UserContext><App_message_page /></UserContext></UserWrapperContext>} />
          </Routes>
        )
      }



    </div >
  )
}

export default App


// import React, { useEffect } from 'react'
// import { Route, Routes } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { setSocket } from './components/redux-store/counter/socketSlice.js'
// import { setMessage, setMessages, setonlineUsers } from './components/redux-store/counter/chatSlice.js'
// import { setLikeNotification } from './components/redux-store/counter/rtnSlice.js'
// import socket from './socket/Socket_io.js'

// // Pages and wrappers
// import User_home_page from './components/User_pages/User_home_page'
// import User_signup_page from './components/application interface/Auth pages/User_signup_page.jsx'
// import User_scearch_page from './components/User_pages/User_scearch_page'
// import App_profile_page from './components/application interface/profile page comp/App_profile_page'
// import Demo_upload from './components/User_pages/demo_upload'
// import User_logout_page from './components/application interface/Auth pages/User_logout_page.jsx'
// import App_post_uploads_temp from './components/application interface/create content comp/App_post_uploads_temp'
// import App_thoughts_page from './components/application interface/thoughts page comp/App_thoughts_page'
// import App_post_thoughts from './components/application interface/create content comp/App_post_thoughts.jsx'
// import App_message_page from './components/application interface/messages content comp/App_message_page.jsx'
// import PageNotFound from './components/common_Routes/PageNotFound.jsx'
// import UserContext from './Contexts/UserContext'
// import UserWrapperContext from './Contexts/UserWrapperContext.jsx'

// const App = () => {
//   const dispatch = useDispatch()
//   const { admin_details } = useSelector(store => store.auth)
//   const { rtnLikeNotification_ } = useSelector(state => state.rtnLikeNotification)

//   useEffect(() => {
//     if (admin_details) {
//       // Attach userId to socket query
//       socket.io.opts.query = { userId: admin_details.userId }

//       if (!socket.connected) {
//         socket.connect()
//         dispatch(setSocket(socket))
//       }

//       // Attach listeners
//       const handleOnlineUsers = (onlineusers) => {
//         dispatch(setonlineUsers(onlineusers))
//       }

//       const handleNotification = (notification) => {
//         dispatch(setLikeNotification({ notification, rtn: rtnLikeNotification_ }))
//       }

//       const handleNewMessage = (newMessage) => {
//         console.log('newMessage', newMessage)
//       }

//       socket.on('getOnlineUser', handleOnlineUsers)
//       socket.on('notification', handleNotification)
//       socket.on('newMessage', handleNewMessage)

//       // Cleanup
//       return () => {
//         socket.off('getOnlineUser', handleOnlineUsers)
//         socket.off('notification', handleNotification)
//         socket.off('newMessage', handleNewMessage)
//         socket.disconnect()
//         dispatch(setSocket(null))
//         dispatch(setMessages(null))
//         dispatch(setMessage(null))
//       }
//     }
//   }, [admin_details, rtnLikeNotification_, dispatch])

//   return (
//     <div>
//       <Routes>
//         <Route path='*' element={<PageNotFound />} />
//         <Route path='/' element={<UserWrapperContext><UserContext><User_home_page /></UserContext></UserWrapperContext>} />
//         <Route path='/users/home' element={<UserWrapperContext><UserContext><User_home_page /></UserContext></UserWrapperContext>} />
//         <Route path='/users/search' element={<User_scearch_page />} />
//         <Route path='/users/register' element={<User_signup_page />} />
//         <Route path='/users/thoughts' element={<App_thoughts_page />} />
//         <Route path='/users/profile/:id' element={<UserContext><App_profile_page /></UserContext>} />
//         <Route path='/users/demo' element={<Demo_upload />} />
//         <Route path='/users/logout' element={<User_logout_page />} />
//         <Route path='/users/post_uploads' element={<App_post_uploads_temp />} />
//         <Route path='/users/post_thoughts' element={<App_post_thoughts />} />
//         <Route path='/users/message' element={<UserWrapperContext><UserContext><App_message_page /></UserContext></UserWrapperContext>} />
//       </Routes>
//     </div>
//   )
// }

// export default App
