import React, { useState, useEffect, useContext } from 'react'
import './App_profile_template.css'
import default_profile_pic from '../../../../public/images/default_profile_pic.svg'
import { useParams } from 'react-router-dom';
import { userDataContext } from '../../../Contexts/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import App_post_uploads_temp from '../create content comp/App_post_uploads_temp';
import App_uploads_layout_template from './App_uploads_layout_template';
import App_uploads_info_template from '../application home templates/App_uploads_info_template';
import { checkConnected } from '../../redux-store/counter/connect-disconnect';
import { setUser_profile } from '../../redux-store/counter/user_profile_slice';

const App_profile_template = (props) => {
  // states
  const dispatch = useDispatch()
  const user_id_ = useParams();
  const { admin_details } = useSelector((state) => state.auth);
  const { isConnected } = useSelector((state) => state.is_connected);
  const { user_profile_details } = useSelector((state) => state.userProfile);
  

  const [get_uplaods_information, setget_uplaods_information] = useState([]);
  const [is_connected_toggle, setis_connected_toggle] = useState(user_profile_details.follower_includes)
  const [user_follower_count, setuser_follower_count] = useState(user_profile_details.Followers_len)

  
  


  //--------------------------- contexts
  const { setedit_admin_toggle, edit_admin_toggle, toggle_edit_temp_fun, toggle_uplaods_overlay_info_fun, isUploads_display_info } = useContext(userDataContext);
 
 

  // -------------------- funtions -------------------------

  const toggle_edit_temp_fun_ = () => {
    toggle_edit_temp_fun();
  }

  // toggle buttons on user/admin pages
  const toogle_buttons_fun = () => {
    if (props.user_data_toggle === 'true') {setedit_admin_toggle(true);} 
    else if (props.user_data_toggle === 'false') { setedit_admin_toggle(false); }
  }
  useEffect(() => {
    toogle_buttons_fun()
  }, [props.user_data_toggle]);

  // -----------------------> follow unfollow funtoins

  const follow_unfollow_fun = async () => {

    const follow_unfollow_data_send = {
      Follower_id: admin_details._id,
      Following_id: user_id_.id
    }
    const axios_follow_unfollow_send = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/follownunfollow/${user_id_.id}`, follow_unfollow_data_send, { withCredentials: true });

    const is_connectd_ = axios_follow_unfollow_send.data.isConnected
    const updated_connect = is_connectd_ ? user_follower_count + 1 : user_follower_count -1;
    const updated_user_data = {
      ...user_profile_details,
      Followers_len: updated_connect,
    };

    dispatch(setUser_profile(updated_user_data))
    setis_connected_toggle(!is_connected_toggle)
    setuser_follower_count(updated_connect)


  }
  
  //--------------------------> get connected n discoonect user data
  const axios_getConnected_user_fun = async () => {
    const send_edited_data = {
    }
    const axios_send_edit_profile_data = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/getConnect_user/${user_id_.id}`, send_edited_data, { withCredentials: true });
    const isconnected = axios_send_edit_profile_data.data.isFollowing;
    setis_connected_toggle(isconnected)
    setuser_follower_count(user_profile_details.Followers_len)
  }
  axios_getConnected_user_fun()
  

  // -------------------------> get uploads data

  const get_user_uploads_funtion = async () => {
    const send_uplaods_data = {
    }
    const axios_get_user_uploads = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/get_user_uploads/${user_id_.id}`, send_uplaods_data, { withCredentials: true });
    
    setget_uplaods_information(axios_get_user_uploads.data?.send_client_uplaods_data)
    
    // setuser_follower_count(user_profile_details.Followers_len)
    
  }
  useEffect(() => {
    get_user_uploads_funtion()
  }, [location.pathname])


  
  return (
    <div className='app_profile_temp_frame'>


      {/* ----------------->  user profile top frame */}
      <div className="app_profile_page_top_frame">

        <div className="app_profile_picture_div">

          {/* ------------ > user profile picture */}
          <div className="app_user_ppic_div">
            <img src={user_profile_details.profile_picture} alt="" />
          </div>

          <div className="username_display_div">
            <p className="username_para_">
              <span className="app_profile_fullname_span"> {user_profile_details.Firstname} </span>
              <span className="app_profile_fullname_value"> {user_profile_details.Lastname} </span>
            </p>
            {
              edit_admin_toggle ? (
                <> < div className="app_profile_connect_discoonect_btn">
                  <button type='button' className='connect_toggle_btn' onClick={() => { toggle_edit_temp_fun_() }}>edit</button>
                </div> </>
              ) : (<div className="app_profile_connect_discoonect_btn"></div>)}
          </div>
        </div>

        <div className="app_profile_user_details_frame">

          {/* ------------------- posts folowers following --------------*/}
          <div className="app_profile_user_biography_frame">
            <div className="app_peofile_display_username_div">
              <p className="app_profile_usernmae_para">
                {user_profile_details.Username}
              </p>
            </div>

            {/*----------------------- bio, links, fullname ----------------------*/}
            <div className="app_profile_bio_textbox">

              <div className="app_profile_bio_overflow">
                <div className="app_profile_display_div">
                  <p className="app_profile_biography_display">
                    <span className="app_profile_bio_span">{user_profile_details.Bio}</span>
                  </p>
                </div></div> </div>
          </div>

          <div className="app_profile_user_details_1">
            <div className="app_profile_fnf_fame">
              <p className="app_profile_no_posts">{user_profile_details.Posts_len} uploads</p>
              <span><p className="app_profile_fnf_value">{user_follower_count} followers</p></span>
              <span><p className="app_profile_fnf_value">{user_profile_details.Following_len} following</p></span>
            </div>{
              edit_admin_toggle ? (<></>) : (
                <div className="app_profile_connect_discoonect_btn">
                  <button type='button' className='connect_toggle_btn' onClick={() => {follow_unfollow_fun() }}>
                    {is_connected_toggle ? 'disconnect' : 'connect'}
                  </button>
                </div>)}
          </div></div>
      </div>

      {/* -------------------> user profile status frame */}
      <div className="app_profile_page_status_frame">

      </div>

      {/* --------------- slide uploads, etc  */}
      <div className="app_profile_slide_ivu">

        <p className="profile_slide_ivu_para">
          uploads
        </p>
      </div>

      {/* --------------------> user profile post frame */}
      <div className="app_profile_page_post_frame">

        {/* ------------------ posts, images, videos frame slide -------------------------- */}
        <div className="app_profile_uploads_frame">

          {get_uplaods_information.map((item, index) => (

            isUploads_display_info ? (
              <div className="uploads_overlay_frame_" key={index} >

                <App_uploads_info_template author_id={get_uplaods_information.author} author_profilePic={get_uplaods_information.author_pic} />
              </div>
            ) :
              <div className="app_profile_uploads_template" key={index} onClick={() => {
                toggle_uplaods_overlay_info_fun(get_uplaods_information[index].uploads_id, get_uplaods_information[index].uploads_url, get_uplaods_information[index].author_pic, get_uplaods_information[index].author_username);
              }}>
                <App_uploads_layout_template profile_uploads_likes={item.likes_len} profile_uploads_comments={item.comments_len} profile_uploads_url={item.uploads_url} key_={index} />
              </div>
          ))}
        </div>


      </div>


    </div >
  )
}

export default App_profile_template
