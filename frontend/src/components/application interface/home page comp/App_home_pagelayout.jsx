import React, { useContext, useEffect, useState } from 'react'
import './App_home_pagelayout.css'
import './App_home_pagelayout_2.css'
import App_home_user_suggestion_template from './App_home_user_suggestion_template'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import App_user_uploads_template from './App_user_uploads_template'
import { setUpload } from '../../redux-store/counter/uploadsSlice'
import { userDataContext } from '../../../Contexts/UserContext'
import GetallPosts from './GetallPosts'
import gsap from 'gsap'
import App_delete_uploads from '../create content comp/App_delete_uploads'
import App_uploads_info_template from '../application home templates/App_uploads_info_template'
import { setSuggestedUsers } from '../../redux-store/counter/authSlice'

const App_home_pagelayout = () => {

    const { isUploads_display_info } = useContext(userDataContext)

    if (isUploads_display_info === true) {
        gsap.to('.app_side_bar_div', {
            zIndex: 5,
            delay: 0,
            duration: 0,
            display: 'none',
            position: 'relative',

        })
    } else {
        gsap.to('.app_side_bar_div', {
            zIndex: 5,
            display: 'block',
            position: 'fixed',
            delay: 0,
            duration: 0,

        })
    }
    const dispatch = useDispatch();

    const { admin_details } = useSelector((state) => state.auth);
    const { uploads } = useSelector((state) => state.uploads);


    const [suggested_user_data, setsuggested_user_data] = useState([{}]);


    const [page, setpage] = useState(1)
    const [data, setdata] = useState([])
    const [loading_bol, setloading_bol] = useState(false)
    const [data_bol, setdata_bol] = useState(true)



    if (data_bol) {
        useEffect(() => {

            const get_all_users_uploads = async () => {
                const axios_get_all_uplaods_ = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/get_all_uploads?page=${page}&limit=${3}`, { withCredentials: true });
                setloading_bol(true)
                dispatch(setUpload(axios_get_all_uplaods_.data.posts));
                setdata(prev => [...prev, ...axios_get_all_uplaods_.data.posts])
                setdata_bol(false)
                setpage(1 + 1);
                setloading_bol(false)
            }
            get_all_users_uploads();
        }, [location.pathname])

    } else {
        useEffect(() => {
            dispatch(setUpload(uploads))



            const get_all_users_uploads = async () => {
                setloading_bol(true)
                const axios_get_all_uplaods_ = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/get_all_uploads?page=${page}&limit=${3}`, { withCredentials: true });
                if (axios_get_all_uplaods_.status == 200) {
                    setdata(prev => [...prev, ...axios_get_all_uplaods_.data.posts])
                    dispatch(setUpload(data));
                    setdata_bol(false)
                }
                setloading_bol(false)

            }
            get_all_users_uploads();
        }, [page])
    }


    const handleScroll = () => {


        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setpage(prevPage => prevPage + 1);
        }
    }


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, [])


    // --------- all funtions --------------------------------
    const get_user_suggetions_fun = async (e) => {
        const axios_get_users_suggetions = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/suggested`, { withCredentials: true });
        const suggestedUsersWithCounts = axios_get_users_suggetions.data.suggestedUsers.map((user) => ({
            ...user,
            Followers_len: user.Follower.length,
            Following_len: user.Following.length,
            Follower: user.Follower,
            Following: user.Following,
        }));
        setsuggested_user_data(suggestedUsersWithCounts.slice(0, 5));
        dispatch(setSuggestedUsers(suggestedUsersWithCounts.slice(0, 5)));

    }
    useEffect(() => {
        get_user_suggetions_fun();
    }, [5 * 60 * 1000])


    // return (
    //     <div className='App_home_pagelayout_frame'>

    //         {/*------------------ displayes the user uploaded posts -----------------*/}
    //         <div className="app_home_posts_display_cont">

    //             <div className="app_home_moments_frame">

    //             </div>
    //             <div className="app_home_display_all_uplaods_frame">
    //                 {uploads.map((upload) => (
    //                     <div className="app_home_uplaods_display_div" key={upload._id} >
    // <App_user_uploads_template uploads={upload} />
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>

    //         {/*-------------------- suggetions and other imp fetaures -----------------*/}
    //         <div className="app_home_interactive_cont">

    //             <div className="app_interactive_frame">

    //                 <div className="feature_template_div">

    //                 </div>
    //                 <div className="admin_profile_template_div">
    //                     <App_home_user_suggestion_template Username={`${admin_details.Username}`} user_id={`${admin_details.userId}`} profilePic={admin_details.profilePic} Firstname={admin_details.Firstname} Lastname={admin_details.Lastname} admin_id={true} />
    //                 </div>
    //             </div>
    //             <div className="app_user_suggetions_frame">

    //                 <div className="app_suggetion_title">
    //                     <p className="suggetion_title_p">
    //                         Users available
    //                     </p>
    //                 </div>

    //                 <div className="users_suggetion_template_div">

    //                     {suggested_user_data.map((user, index) => (
    //                         <div className="user_suggested_template" key={index} >
    //                             <App_home_user_suggestion_template Username={`${user.Username}`} user_id={`${user._id}`} profilePic={user.profilePic} Firstname={user.Firstname} Lastname={user.Lastname} Follower_len={user.Followers_len} Following_len={user.Following_len} />
    //                         </div>))}

    //                 </div>
    //             </div>
    //         </div>





    //     </div>
    // )

    return (
        <div className='App_home_pagelayout_frame'>


            <div className="app_home_highlights_div">


            </div>

            {/* main frame */}


            <div className="app_home_main_frame">

                {/* ------------------------> uploads template div */}
                <div className="app_home_all_uploads_display_">

                    {data_bol ? (
                        data.map((upload, index) => (
                            <div className="home_uploads_template_div" key={index}>
                                <App_user_uploads_template uploads={upload} />
                            </div>))) :
                        (uploads.map((upload, index) => (
                            <div className="home_uploads_template_div" key={index}>
                                <App_user_uploads_template uploads={upload} />
                            </div>
                        )))
                    } {loading_bol && <div className="loading_spinner"> loading ....</div>}


                </div>

                {/* ------------------------ home suggetion frame */}
                <div className="app_home_interactive_cont_">
                    <div className="app_interactive_frame">
                        <div className="feature_template_div">

                        </div>
                        <div className="admin_profile_template_div">
                            <App_home_user_suggestion_template Username={`${admin_details.Username}`} user_id={`${admin_details.userId}`} profilePic={admin_details.profilePic} Firstname={admin_details.Firstname} Lastname={admin_details.Lastname} admin_id={true} />
                        </div>
                    </div>
                    <div className="app_user_suggetions_frame">

                        <div className="app_suggetion_title">
                            <p className="suggetion_title_p">
                                Users available
                            </p>
                        </div>

                        <div className="users_suggetion_template_div">

                            {suggested_user_data.map((user, index) => (
                                <div className="user_suggested_template" key={index} >
                                    <App_home_user_suggestion_template Username={`${user.Username}`} user_id={`${user._id}`} profilePic={user.profilePic} Firstname={user.Firstname} Lastname={user.Lastname} Follower_len={user.Followers_len} Following_len={user.Following_len} />
                                </div>))}

                        </div>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default App_home_pagelayout
