import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './App_user_uploads_template.css'
import app_uplaods_like from '../../../../public/images/app_uplaods_like.svg'
import app_uploads_unlike from '../../../../public/images/app_uploads_unlike.svg'
import app_uploads_bookmarks from '../../../../public/images/app_uploads_bookmarks.svg'
import app_uploads_unbookmarks from '../../../../public/images/app_uploads_unbookmarks.svg'
import app_uploads_edit from '../../../../public/images/app_uploads_edit.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setUpload } from '../../redux-store/counter/uploadsSlice'
import { userDataContext } from '../../../Contexts/UserContext'
import App_uploads_info_template from '../application home templates/App_uploads_info_template'
import App_delete_uploads from '../create content comp/App_delete_uploads'
import { useNavigate } from 'react-router-dom'



const App_user_uploads_template = (props) => {
    const { uplaods_more_info_toogle_, toggle_uplaods_more_info_frame, toggle_uplaods_overlay_info_fun, isUploads_display_info } = useContext(userDataContext);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { admin_details } = useSelector((state) => state.auth);
    const { uploads } = useSelector((state) => state.uploads);

    const [isUpload_likes_state, setisUpload_likes_state] = useState(props.uploads.likes.includes(admin_details?.userId) || false);
    const [uploads_like, setuploads_like] = useState(props.uploads.likes.length)


    // useEffect(() => {
    //     setadmin_uploads_profile_pic(props.uploads.author.profilePic);
    // }, [])

    // console.log(props.uploads)

    const push_likes_uploads_fun = async (e) => {
        const send_likes_data = {
            admin_id: props.admin_loggedin_is,
        };
        const update_user_likes = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/like_uploads/${props.uploads._id}`, send_likes_data, { withCredentials: true });
        const isLiked = update_user_likes.data.isLiked_uploads;

        setisUpload_likes_state(!isUpload_likes_state);
        const updated_uploads = isLiked ? uploads_like - 1 : uploads_like + 1;
        const updated_uploads_like = uploads.map(P =>
            P._id === props.uploads._id ? {
                ...P,
                likes: isLiked ? P.likes.filter(id => id !== admin_details.userId) : [...P.likes, admin_details.userId],
            } : P
        );
        dispatch(setUpload(updated_uploads_like));
        setuploads_like(updated_uploads);



    };

    return (
        <div className='app_user_home_uploads_template'>

            {isUploads_display_info ? (
                <div className="uploads_overlay_frame_" >
                    <App_uploads_info_template author_id={props.uploads.author._id} author_profilePic={props.uploads.author.profilePic} />
                </div>
            ) : (<></>)}

            {uplaods_more_info_toogle_ ? (
                <div className="user_home_uploads_overlay">
                    <div className="user_uploads_more_info_div">
                        <App_delete_uploads author_id={props.uploads.author._id} />
                    </div>
                </div>) : (<></>)}

            <div className="user_home_diplay_uploads_template">

                <div className="user_home_uploads_left_div" onClick={()=>{
                    navigate(`/users/profile/${props.uploads.author._id}`)
                }}>
                    <div className="display_admin_uploads_profile_pic">
                        <img src={
                            props.uploads.author.profilePic} alt="" />
                    </div>
                    <div className="user_home_uplaods_username_div">
                    
                            <p className="display_uploads_admin_username">
                                <span>
                                    {props.uploads.author.Username}
                                </span>
                            </p>
                      

                    </div>

                </div>



                {/* ---------> home page right div  */}

                <div className="user_home_uploads_right_div">
                    <div className="user_home_admin_uploads_edit_div" onClick={() => { toggle_uplaods_more_info_frame(props.uploads._id, props.uploads.author._id) }}>
                        <img src={app_uploads_edit} alt="" />
                    </div>

                </div>


            </div>
            <div className="user_home_uploads_thoughtsdiv">
                <p className="user_home_uploads_thoughts_para">
                    {props.uploads.thought ? (
                        <span className='thought_text'>{props.uploads.thought}</span>
                    ) : (<span className='thought_text_no'>No thought provided</span>)}
                </p>
            </div>


            {/*----------> user uplaods url div diaplay */}
            <div className="user_home_display_url_img_div" onClick={() => { toggle_uplaods_overlay_info_fun(props.uploads._id, props.uploads.uploads, props.uploads.author.profilePic, props.uploads.author.Username) }}>
                <img src={props.uploads.uploads} alt="" />
            </div>

            <div className="user_home_uplaods_features_div">

                <div className="user_home_uploads_leftdiv">
                    <p className='uploads_likes_para'>
                        <span className="uploads_likes_para_san">{uploads_like}</span> likes</p>
                </div>

                <div className="user_home_right_div">
                    <div className="user_home_uploads_features_div" onClick={() => { push_likes_uploads_fun() }}>


                        {isUpload_likes_state === true ? (
                            <img src={app_uplaods_like} alt="" />
                        ) : (<img src={app_uploads_unlike} alt="" />)}
                    </div>
                    <div className="user_home_uploads_features_div" onClick={() => { toggle_uplaods_overlay_info_fun(props.uploads._id, props.uploads.uploads, props.uploads.author.profilePic, props.uploads.author.Username) }}>
                        <img src={app_uploads_bookmarks} alt="" />
                    </div>
                </div>
            </div>

            {/*---------------------------> user uplaods more info */}

            <div className="user_home_uploads_add_comments_div">
                <p className="comments_length">
                    <span>{props.uploads.comments.length}</span> comments
                </p>
                <button onClick={() => { toggle_uplaods_overlay_info_fun(props.uploads._id, props.uploads.uploads, props.uploads.author.profilePic, props.uploads.author.Username) }}>view / add comments</button>
            </div>

        </div>
    )
}

export default App_user_uploads_template
