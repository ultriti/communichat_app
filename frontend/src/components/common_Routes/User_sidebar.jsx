import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import User_logout_page from '../application interface/Auth pages/User_logout_page'
import './User_sidebar.css'
import ssm1 from '../../../public/images/ssm1.svg'
import search_icon from '../../../public/images/search_icon.svg'
import home_icon from '../../../public/images/home_icon.svg'
import default_profile_pic from '../../../public/images/default_profile_pic.svg'
import app_thoughts_icon from '../../../public/images/app_thoughts_icon.svg'
import ultriti_logo from '../../../public/images/ultriti_logo.svg'
import app_side_bar_create from '../../../public/images/app_side_bar_create.svg'
import message_icon from '../../../public/images/chat_messgae.webp'
import app_logout from '../../../public/images/app_logout.svg'
import { removelikeNotification, setLikeNotification } from '../redux-store/counter/rtnSlice'

// import images
import notification_webp from "../../../public/images/notification-bell.webp"


const User_sidebar = () => {
  const dispatch = useDispatch()

  const { admin_details } = useSelector((state) => state.auth);
  const { rtnLikeNotification_ } = useSelector((state) => state.rtnLikeNotification);
  const nav = useNavigate()
  const [notificationBool, setnotificationBool] = useState(false)
  const [isNavlinkActive, isNetnavlinkActive] = useState(false)

  const notificationBoolFuntion = () => {
    setnotificationBool(!notificationBool)
  }

  return (
    <div className='user_sidebar_frame'>


      {
        notificationBool ? (
          <div className="sliderFrame_Sidebar">
            {rtnLikeNotification_.map((likedDetail, index) => (
              <>
                {/* <div className="notificationDetailFrame"></div> */}
                <div className="notificationDetailFrame">

                  <div className="RTL_ProfilePic_div">
                    <img src={likedDetail.userDetails.profilePic} alt="" />
                  </div>
                  <div className="RTL_ProfileDetail_div">
                    <p>{likedDetail.userDetails.Username}</p> <p className='text_'> liked your upload</p>
                  </div>

                  <div className="RTL_upload_div">
                    <img src={likedDetail.Upload_url} alt="" />
                  </div>

                </div>
              </>
            ))}
          </div>
        ) : (<></>)
      }



      <div className="sidebar_page_list">
        <a href='https://www.ultriti.com/' target='_blank'><img src={ultriti_logo} alt="" /></a>
      </div>

      <div className="sidebar_page_list">
        <div className="sidebarPageCont">
          <NavLink to='/users/home'
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "navlink_active" : "navlink_inactive" }`
              
            }
          ><img src={home_icon} alt="" /></NavLink>

        </div>
      </div>
      <div className="sidebar_page_list">
        <div className="sidebarPageCont">
          <NavLink to='/users/search'
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "navlink_active" : "navlink_inactive"}`
            }
          ><img src={search_icon} alt="" /></NavLink>
        </div>
      </div>

      <div className="sidebar_page_list">
        <div className="sidebarPageCont">
          <NavLink to='/users/message'
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "navlink_active" : "navlink_inactive"}`
            }
          ><img src={message_icon} alt="" /></NavLink>
        </div>

      </div>

      {/* notififcation button */}

      <div className="sidebar_page_list">
        <div className="sidebarPageCont">
          <NavLink ><img src={notification_webp} alt="" /></NavLink>

          {/* ,dispatch(removelikeNotification(rtnLikeNotification_)) */}

          <div className="navbar_overlay" onClick={() => { notificationBoolFuntion() }}>
            {
              rtnLikeNotification_ && rtnLikeNotification_.length ? (

                <div className="NavbarOverlay_indicator" >
                  <p>{rtnLikeNotification_.length}</p>
                </div>
              ) : (<></>)
            }
          </div>
        </div>
      </div>



      {/* <div className="sidebar_page_list">
        <div className="sidebarPageCont">
          <NavLink to={`/users/thoughts`}
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "navlink_active" : "navlink_inactive"}`
            }
          ><img src={app_thoughts_icon} alt="" /></NavLink>

        </div>

      </div> */}
      <div className="sidebar_page_list">
        <div className="sidebarPageCont">

          <NavLink to={`/users/profile/${admin_details.userId}`}
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "navlink_active_p" : "navlink_inactive_p"}`
            }
          >
            <div className="sideBarImgdiv">
              <img src={admin_details.profilePic} alt="" />

            </div>
          </NavLink>
        </div>
      </div>

      <div className="sidebar_page_list">
        <div className="sidebarPageCont">
          <NavLink to={`/users/post_uploads`}
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "navlink_active" : "navlink_inactive"}`
            }
          ><img src={app_side_bar_create} alt="" /></NavLink>

        </div>
      </div>
      <div className="sidebar_page_list">
        <div className="sidebarPageCont">
          <NavLink to={`/users/logout`}
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "navlink_active" : "navlink_inactive"}`
            }
          ><img src={app_logout} alt="" /></NavLink>

        </div>

      </div>


    </div>
  )
}

export default User_sidebar
