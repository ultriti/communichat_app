import React, { useEffect, useState } from 'react'
import '../../User_stylesheets/User_page_common.css'
import './App_profile_page.css'
import User_navbar from '../../User_pages/User_navbar'
import User_sidebar from '../../User_pages/User_sidebar'
import App_profile_template from './App_profile_template'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import Edit_profile_template from './edit profile temp/Edit_profile_template'
import { useDispatch, useSelector } from 'react-redux'
import { setUser_profile } from '../../redux-store/counter/user_profile_slice'


const App_profile_page = () => {

    const dispatch = useDispatch();
    const user_id_ = useParams();
    const location = useLocation();
    const { admin_details } = useSelector((state) => state.auth);
  const { user_profile_details } = useSelector((state) => state.userProfile);

    const [user_data_profile, setuser_data_profile] = useState({});

    useEffect(() => {

        const get_user_profile_details_funtion = async () => {
            const axios_get_user_profile_details = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${user_id_.id}/profile`, { withCredentials: true });

            const user_data = {
                user_data_toggle: axios_get_user_profile_details.data.user_data_toggle,
                ID: axios_get_user_profile_details.data.user._id,
                Username: axios_get_user_profile_details.data.user.Username,
                Firstname: axios_get_user_profile_details.data.user.Fullname.Firstname,
                Lastname: axios_get_user_profile_details.data.user.Fullname.Lastname,
                Gender: axios_get_user_profile_details.data.user.Gender,
                Bio: axios_get_user_profile_details.data.user.bio,
                profile_picture: axios_get_user_profile_details.data.user.profilePic,
                Follower:axios_get_user_profile_details.data.user.Follower,
                Following:axios_get_user_profile_details.data.user.Following,
                Followers_len: axios_get_user_profile_details.data.user.Follower.length,
                Following_len: axios_get_user_profile_details.data.user.Following.length,
                Posts: axios_get_user_profile_details.data.user.post,
                Posts_len: axios_get_user_profile_details.data.user.post.length,
                follower_includes : axios_get_user_profile_details.data.user.Follower.includes(admin_details?.userId) || false,
            }
            dispatch(setUser_profile(user_data));
            setuser_data_profile(user_data);
        }
        get_user_profile_details_funtion();
        
    }, [location.pathname])


    return (
        <div className='application_main_frame_profile'>
            {/* overlaw */}
            <div className="overlay_profile_page_">

                <div className="overlay_profile_edit_template_div">
                    <Edit_profile_template />
                </div>

            </div>

            {/* navbar div */}
            {/* <div className="user_navbar_div">
                <User_navbar />
            </div> */}

            {/* main frame div */}
            <div className="user_main_frame">

                {/* app side bar frame */}
                <div className="user_sidebar_1">
                    <User_sidebar />
                </div>


                {/* app main cont frame */}
                <div className="main_cont_frame_profile">


                    <App_profile_template  user_data_toggle={user_data_profile.user_data_toggle}  />


                </div>

            </div>

        </div>
    )
}

export default App_profile_page
