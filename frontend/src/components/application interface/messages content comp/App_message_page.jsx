import React, { useContext, useEffect, useState } from 'react'
import './App_message_page.css'
import '../../User_stylesheets/User_page_common.css'
import { useDispatch, useSelector } from 'react-redux'
import User_sidebar from '../../common_Routes/User_sidebar'
import { setSelectedUser } from '../../redux-store/counter/authSlice'
import axios from 'axios'
import { setMessages } from '../../redux-store/counter/chatSlice'
import Messages from './Messages'

import sendImg from "../../../../public/images/app_send_data.svg"
import search_white_icon from '../../../../public/images/search_white_icon.svg'
import addOptions from "../../../../public/images/app_side_bar_create.svg"

import EmojiPicker from "emoji-picker-react";
import { userDataContext } from '../../../Contexts/UserContext'
import LoadingSpinner from '../../common_Routes/Loading';
import { useNavigate } from 'react-router-dom'


const App_message_page = () => {
  const [textMessage, settextMessage] = useState('')
  const [AdminMessageingUsers, setAdminMessageingUsers] = useState([])
  const [AdminNonMessagingUsers, setAdminNonMessagingUsers] = useState([])
  const [search_bar_state, setsearch_bar_state] = useState('')
  const [filteredAccount, setfilteredAccount] = useState([])
  const [isFiltered, isFetfiltered] = useState(false)
  const [isLoading, setisLoading] = useState(false)


  const { toggle_Emoji_frame_fun, emojiTempToggle, toggle_Emoji_frame_fun_ } = useContext(userDataContext)


  const dispatch = useDispatch()
  const { admin_details, selected_user } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const { suggested_users } = useSelector((state) => state.suggestedUsers);
  const { onlineUsers, messages } = useSelector(store => store.onlineUsers)


  // get admin messageing user
  const getAllTextingUsers = async () => {

    setisLoading(true)

    try {
      const getAllUsers = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/message/getTextingUsers`, { withCredentials: true });


      if (getAllUsers.status == 404) {
        navigate("/users/Login")
      }

      if (getAllUsers.status === 200 || getAllUsers.data.success === true) {
        console.log("--> all messign data", getAllUsers.data.allMessagingUsers)
        console.log("--> all non  messign data", getAllUsers.data.allNonmessagingUsers)
        setisLoading(false)
        setAdminMessageingUsers(getAllUsers.data.allMessagingUsers)
        setAdminNonMessagingUsers(getAllUsers.data.allNonmessagingUsers)

      }
    } catch (error) {
      alert("Error fetching messaging users");
      console.log("Error fetching messaging users", error);
    }
  }

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

  // find_user_filter
  const find_user_filter = (e) => {
    e.preventDefault();

    console.log('search_bar_state', search_bar_state);


    if (search_bar_state == "") {
      isFetfiltered(false)
    }

    const keyword = search_bar_state.trim().toLowerCase();

    if (!keyword) {
      setfilteredAccount([]);
      isFetfiltered(false);
      return;
    }

    const filtered = AdminMessageingUsers.filter(user => {
      const username = user.Username?.toLowerCase() || "";
      const firstname = user.Fullname?.Firstname?.toLowerCase() || "";
      const lastname = user.Fullname?.Lastname?.toLowerCase() || "";

      return (
        username.includes(keyword) ||
        firstname.includes(keyword) ||
        lastname.includes(keyword)
      );
    });

    setfilteredAccount(filtered);
    isFetfiltered(true);
    console.log("Filtered users:", filtered);
  };


  useEffect(() => {




    getAllTextingUsers();
  }, [])
  // textMessage


  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    }

  }, [])

  return (
    <div className='message_page_frame'>



      {
        isLoading ? (
          <div className="loading_frame_">
            <LoadingSpinner />
          </div>
        ) : (

          <>
            <div className='user_main_frame_'>
              <div className="user_sidebar_1_">
                <User_sidebar />
              </div>

              <div className="user_msg_main_template">

                {/* message user left frame */}
                <div className="user_user_chats_leftdiv">
                  <div className="user_chats_frame">

                    <div className="userSearchFrame">
                      <form
                        onSubmit={find_user_filter}
                        className='userSearchForm'>

                        <label htmlFor=""><input type="text" placeholder='search accounts' value={search_bar_state} onChange={(e) => { setsearch_bar_state(e.target.value) }} /></label>

                        <div className="find_search_btn_div">
                          <button type="submit"><img src={search_white_icon} alt="" /></button>
                        </div>

                      </form>
                    </div>

                    {/* ----------- texting users user */}


                    {
                      isFiltered ? (

                        (filteredAccount != "") ? (
                          filteredAccount.map((suggested_user, index) => {

                            const isOnline = onlineUsers.includes(suggested_user?._id);


                            return (

                              <div
                                className={
                                  suggested_user._id == selected_user?._id ? "msg_user_list_inactive" : "msg_user_list"} key={index} onClick={() => { dispatch(setSelectedUser(suggested_user)) }
                                  }>


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
                        )
                          : (
                            <>
                              <p className='nouserfound'>no user found</p>
                            </>
                          )



                      ) : (

                        AdminMessageingUsers.map((suggested_user, index) => {

                          const isOnline = onlineUsers.includes(suggested_user?._id);


                          return (

                            <div
                              className={
                                suggested_user._id == selected_user?._id ? "msg_user_list_inactive" : "msg_user_list"} key={index} onClick={() => { dispatch(setSelectedUser(suggested_user)) }
                                }>


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

                      )
                    }

                    <div className='divider'>
                      <p>chat also with ...</p>
                    </div>
                    {
                      AdminNonMessagingUsers.map((suggested_user, index) => {
                        const isOnline = onlineUsers.includes(suggested_user?._id);

                        return (

                          <div className={
                            suggested_user._id == selected_user?._id ? "msg_user_list_inactive" : "msg_user_list"} key={index} onClick={() => { dispatch(setSelectedUser(suggested_user)) }
                            }>

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
                            <div className="emoji_div" onClick={() => { toggle_Emoji_frame_fun() }}>
                              <p className='emoji_text'>😊</p>
                            </div>
                            <input
                              value={textMessage}
                              onChange={(e) => settextMessage(e.target.value)}
                              type="text"
                              className="chat-input"
                              placeholder="Message..."
                              autoFocus
                              autoCorrect='on'
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
          </>)
      }


    </div>
  )
}

export default App_message_page
