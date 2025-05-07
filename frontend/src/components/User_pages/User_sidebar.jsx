import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import User_logout_page from './User_logout_page'
import '../User_stylesheets/User_sidebar.css'
import ssm1 from '../../../public/images/ssm1.svg'
import search_icon from '../../../public/images/search_icon.svg'
import home_icon from '../../../public/images/home_icon.svg'
import default_profile_pic from '../../../public/images/default_profile_pic.svg'
import app_thoughts_icon from '../../../public/images/app_thoughts_icon.svg'
import ultriti_logo from '../../../public/images/ultriti_logo.svg'
import app_side_bar_create from '../../../public/images/app_side_bar_create.svg'
import app_logout from '../../../public/images/app_logout.svg'
import { removelikeNotification, setLikeNotification } from '../redux-store/counter/rtnSlice'

// import images
import notification_webp from "../../../public/images/notification-bell.webp"


const User_sidebar = () => {
  const dispatch = useDispatch()

  const { admin_details } = useSelector((state) => state.auth);
  const { rtnLikeNotification_ } = useSelector((state) => state.rtnLikeNotification);
  const nav = useNavigate()

  console.log("noti:::", rtnLikeNotification_);



  return (
    <div className='user_sidebar_frame'>

      <div className="sidebar_page_list">
        <a href='https://www.ultriti.com/' target='_blank'><img src={ultriti_logo} alt="" /></a>
      </div>
      <div className="sidebar_page_list">
        <NavLink to='/users/home'><img src={home_icon} alt="" /></NavLink>
      </div>
      <div className="sidebar_page_list">
        <NavLink to='/users/search'><img src={search_icon} alt="" /></NavLink>
      </div>
      <div className="sidebar_page_list">
        <NavLink to='/users/message'><img src={search_icon} alt="" /></NavLink>
      </div>
      <div className="sidebar_page_list">
        <NavLink ><img src={notification_webp} alt="" /></NavLink>
        <div className="navbar_overlay" onClick={()=>{dispatch(removelikeNotification())}}>
          {
            rtnLikeNotification_ &&  rtnLikeNotification_.length ? (
              
              <div className="NavbarOverlay_indicator" >
                <p>{rtnLikeNotification_.length }</p>


                
              </div>
            ) : (<></>)
          }

        </div>
      </div>
      <div className="sidebar_page_list">
        <NavLink to={`/users/thoughts`}><img src={app_thoughts_icon} alt="" /></NavLink>

      </div>
      <div className="sidebar_page_list">
        <NavLink to={`/users/profile/${admin_details.userId}`}><img src={admin_details.profilePic} alt="" /></NavLink>
      </div>

      <div className="sidebar_page_list">
        <NavLink to={`/users/post_uploads`}><img src={app_side_bar_create} alt="" /></NavLink>
      </div>
      <div className="sidebar_page_list">
        <NavLink to={`/users/logout`}><img src={app_logout} alt="" /></NavLink>
      </div>


    </div>
  )
}

export default User_sidebar
