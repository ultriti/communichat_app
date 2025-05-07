import React, { useState } from 'react'
import './App_post_uploads_temp.css'
import '../../User_stylesheets/User_page_common.css'
import User_navbar from '../../User_pages/User_navbar'
import User_sidebar from '../../User_pages/User_sidebar.jsx'
import default_profile_pic from '../../../../public/images/default_profile_pic.svg'

import axios from 'axios'

import { Cloudinary } from 'cloudinary-core';
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUpload } from '../../redux-store/counter/uploadsSlice.js'

const cloudinary = new Cloudinary({
  cloud_name: 'dqifawygq',
  api_key: '352965717988348',
  api_secret: '4ug3VX3fv2PoJaN0FlIEBckbsdo',
});


const App_post_uploads_temp = () => {
  const { uploads } = useSelector((state) => state.uploads);
  const dispatch = useDispatch()

  const nav = useNavigate()

  // states 
  const [uploads_image_display_state, setuploads_image_display_state] = useState('');
  const [post_uploads_input, setpost_uploads_input] = useState({});
  const [uploads_thoughts_input, setuploads_thoughts_input] = useState('');
  const [uploads_comments_input, setuploads_comments_input] = useState('');

  const [get_img_from_cloud2, setget_img_from_cloud2] = useState('');
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB


  // --------------------------------- funtions --------------------------------
    // drag and rop fun
    const handleDrop = (e) => {
      e.preventDefault();
      const [file] = e.dataTransfer.files;
      if (file) {
        if (file.size <= MAX_FILE_SIZE) {
          setpost_uploads_input(file);
          const fileURL = URL.createObjectURL(file);
          setuploads_image_display_state(fileURL);
        } else {
          alert('File size exceeds the maximum limit of 5MB.');
        }
      } else {
        console.log('No file selected');
      }
    }


  // browse uploads image funtion
  const browse_uploads_pic_funtion = (e) => {
    const file = e.target.files[0];

    
    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        setpost_uploads_input(file);
        const fileURL = URL.createObjectURL(file);
        setuploads_image_display_state(fileURL);
        e.target.autoClose = true;
      } else {
        alert('File size exceeds the maximum limit of 5MB.');
      }
    } else {
      console.log('No file selected');
    }
  };

  // uploads image to server  funtion
  const post_uploads_pic_funtion = async (e) => {

    e.preventDefault();
    const reader = new FormData();
    reader.append('file', post_uploads_input);
    reader.append('upload_preset', 'communichat_folder');
    reader.append('cloud_name', 'dqifawygq');
    reader.append('width', 480);
    reader.append('height', 320);
    reader.append('crop', 'limit');
    reader.append('quality', 'auto:best');

    if (post_uploads_input) {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dqifawygq/image/upload`, { method: 'POST', body: reader });


      const uploads_url_admin = await res.json();
      const highQualityImageUrl = cloudinary.url(uploads_url_admin.public_id, {
        width: 1920,
        height: 1080,
        crop: 'limit',
        quality: 'auto:best',
      });

      const send_edited_data = {
        uploads_pic: highQualityImageUrl,
        profile_picture_id: uploads_url_admin.public_id,
        thoughts: uploads_thoughts_input,
        comments: uploads_comments_input,
      };

      const axios_uplaods_details_cloudinary = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/create_user`, send_edited_data, { withCredentials: true });
      dispatch(setUpload([...uploads, axios_uplaods_details_cloudinary.data.img_data]))
      nav('/users/home');
    };

  }



  const handleDragOver = (e) => {
    e.preventDefault();
  };


  return (
    <div className='app_post_uploads_template_frame'>

      {/* -------------->  navbar  <---------------- */}
      {/* <div className="user_navbar_div">
        <User_navbar />
      </div> */}


      {/* app upalods post main frame */}
      <div className="user_main_frame">

        {/* app uplaods post sidebar */}
        <div className="user_sidebar_1">
          <User_sidebar />
        </div>

        {/* right main frame */}
        <div className="main_cont_frame">
          <div className="app_post_uploads_main_cont">
            

            {/* --------------->  left image display img <------------------- */}
            <div className="left_app_uploads_display_frame">
              <div className="uploads_image_display_div" onDrop={handleDrop} onDragOver={handleDragOver}>
                {
                  uploads_image_display_state? (<img src={uploads_image_display_state} alt="" />) 
                  :(<div className="drag_and_drop_file_div">
                      <p className="display_text_dragndrop_para">
                        drag and drop file
                      </p>
                  </div> )
                }
             
              </div>
            </div>

            {/* uploads details thoughts, */}
            <div className="right_app_uploads_information_frame">

              <form action="" onSubmit={post_uploads_pic_funtion} className="post_uploads_form_">
                <div className="post_uploads_browse_btn_div">
                  {
                    uploads_image_display_state?(<></> ):(
                    <label htmlFor="browse_uploads" className='custom_file_upload'><input type="file" autoClose  name="browse" id='browse_uploads' onChange={browse_uploads_pic_funtion}/></label>)
                  }
                </div>

                <div className="post_uploads_thoughts_div">
                  <textarea placeholder='Write your thoughts...' value={uploads_thoughts_input} onChange={(e) => { setuploads_thoughts_input(e.target.value) }} maxLength={200} />
                </div>

                <div className="post_uploads_submit_button">
                  <button type='submit'>Post</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )}

export default App_post_uploads_temp
