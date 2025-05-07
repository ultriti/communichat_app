import React, { useEffect } from 'react'
import "./messages.css"
import useGetAllMessage from '../../../Contexts/useGetAllMessage'
import { useSelector } from 'react-redux'

const Messages = ({ selectedUser }) => {
    const { messages } = useSelector(store => store.onlineUsers)

        useGetAllMessage()
 
    

    return (
        <div className='messages_frame'>

            {/* top message user deatils frqme  */}
            <div className="message_user_details_top_frame">
       
                    <div className="_msg_user_profile_pic">
                        <img src={selectedUser.profilePic} alt="" />
                    </div>
                    {/* userrname */}
                    <div className="_msg_username_">
                        <p>{selectedUser.Username}</p>
                    </div>

                    <div className="msg_view_profile">
                       <a href={`/users/profile/${selectedUser._id}`}>
                       <button className="view_profile_btn">
                            veiw profile
                        </button>
                        </a>

                    </div>
              


            </div>

            {/* bottom message frame  */}
            <div className="message_content_frame_display">
                <div className="message_content_frame_display_cont">

              
                {
                    messages && messages.map((message)=>{
                        
                        return (
                            <div className={`display_message ${message.sender_id === selectedUser._id ? "display_message_user" : "display_message_admin"}`}>
                                <div className={`display_message_type ${message.sender_id === selectedUser._id ? "display_message_type_a" : "display_message_type_u"}`}>
                                <p>{message.message}</p>

                                </div>
                                </div>
                                
                    )
                    })
                }
                  </div>

            </div>


        </div>
    )
}

export default Messages
