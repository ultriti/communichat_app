import React, { useContext, useEffect, useState } from 'react'
import './App_message_page.css'
import '../../User_stylesheets/User_page_common.css'
import { useDispatch, useSelector } from 'react-redux'
import User_sidebar from '../../User_pages/User_sidebar'
import { setSelectedUser } from '../../redux-store/counter/authSlice'
import axios from 'axios'
import { setMessages } from '../../redux-store/counter/chatSlice'
import Messages from './Messages'

import sendImg from "../../../../public/images/app_send_data.svg"
import addOptions from "../../../../public/images/app_side_bar_create.svg"
import EmojiPicker from "emoji-picker-react";
import { userDataContext } from '../../../Contexts/UserContext'

const App_message_page = () => {
  const [textMessage, settextMessage] = useState('')

  const { toggle_Emoji_frame_fun,emojiTempToggle,toggle_Emoji_frame_fun_} = useContext(userDataContext)



  const dispatch = useDispatch()
  const { admin_details, selected_user } = useSelector((state) => state.auth);
  const { suggested_users } = useSelector((state) => state.suggestedUsers);
  const { onlineUsers, messages } = useSelector(store => store.onlineUsers)



  // add emoji
  const handleEmojiClick = (emojiObject) => {
    settextMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };
  //-------------> all funtions
  const sendMsgHandleSubmit = async (e) => {
    e.preventDefault();
    const sendMessage = {
      message: textMessage
    }

    try {
      const sendMsgAxios = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/message/sendMessage/${selected_user?._id}`, sendMessage, { withCredentials: true })

      if (sendMsgAxios.status == 200) {
        dispatch(setMessages([...messages, sendMsgAxios.data.newMessage]));
        settextMessage('')
        toggle_Emoji_frame_fun_()
      }
    } catch (error) {
      console.log("---erorr", error);
    }
  }

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    }

  }, [])


  return (
    <div className='message_page_frame'>

      <div className='user_main_frame_'>
        <div className="user_sidebar_1_">
          <User_sidebar />
        </div>

        <div className="user_msg_main_template">

          {/* message user left frame */}
          <div className="user_user_chats_leftdiv">
            <div className="user_chats_frame">
              {/* ----------- suggested user */}
              {
                suggested_users.map((suggested_user, index) => {
                  const isOnline = onlineUsers.includes(suggested_user?._id);
                  return (
                    <div className="msg_user_list" key={index} onClick={() => { dispatch(setSelectedUser(suggested_user)) }}>
                      {/* user profile pic */}
                      <div className="msg_user_profile_pic">
                        <img src={suggested_user.profilePic} alt="user_profile_pic" />
                      </div>
                      {/* user name */}
                      <div className="msg_user_name">
                        {
                          suggested_user.Fullname.Firstname ? (
                            <p>{suggested_user.Fullname.Firstname} {suggested_user.Fullname.Lastname}</p>

                          ) : <p>{suggested_user.Username}</p>
                        }
                        {
                          isOnline ? (<p className='onlineIndicator_para'>online</p>
                          ) : (<p className='onlineIndicator_para_of'>Offline</p>
                          )
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          {/* right messgae user frame */}
          <div className="msg_right_frame">
            {
              selected_user ? (
                <div className='msg_rf_cont'>


                  {/*--------------- user details  */}
                  <div className="msf_rf_top_user_details">

                    <a href={`/users/profile/${selected_user._id}`}>
                      <div className="msg_user_details">
                        {/* profile pic */}
                        <div className="_msg_user_profile_pic">
                          <img src={selected_user.profilePic} alt="" />
                        </div>
                        {/* userrname */}
                        <div className="_msg_username">
                          <p>{selected_user.Username}</p>
                        </div>
                      </div>
                    </a>
                    {/* user features */}
                    <div className="msg_user_chat_features">

                    </div>
                  </div>

                  {/* -------------- chat box frame */}
                  <div className="chat_box_frame">

                    <div className="chatbox_cont">
                      <Messages selectedUser={selected_user} />
                    </div>

                  </div>
                  {
                    emojiTempToggle ? (
                      <div className="emoji_frame">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    ) : null
                  }
                  {/* {
                    emojiTempToggle ? (
                      <div className="emoji_frame">
                        
                      </div>
                    ) : null
                  } */}

                  {/* send chat frame label */}
                  <div className="send_chat_label_frame">

                    <form onSubmit={sendMsgHandleSubmit} className="chat-form">
                      <div className="emoji_div" onClick={()=>{toggle_Emoji_frame_fun()}}>
                        {/* <img src="" alt="" /> */}
                        <p className='emoji_text'>😊</p>
                      </div>
                      <input
                        value={textMessage}
                        onChange={(e) => settextMessage(e.target.value)}
                        type="text"
                        className="chat-input"
                        placeholder="Message..."
                      />

                      <button type="submit" className="send_msg_btn">
                        <img src={sendImg} alt="Send" />
                      </button>
                    </form>


                    <div className="chat_icons">
                      <img src={addOptions} alt="Attach Image" />
                    </div>


                  </div>


                </div>
              ) : (
                <div className="msg_right_frame__no_user_selected">

                  <div className="msg_right_frame_details">
                    {/* profile pic */}
                    <div className="msg_user_propfile_pic">
                      <img src='https://th.bing.com/th?q=Message+Icon+PNG&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247' alt="user_profile_pic" />
                    </div>
                    {/* username */}
                    <div className="msg_right_frame_details__user_name">

                      <p>send message to start a chat </p>

                    </div>

                  </div>
                </div>
              )

            }

          </div>



        </div>


      </div>

    </div>
  )
}

export default App_message_page
