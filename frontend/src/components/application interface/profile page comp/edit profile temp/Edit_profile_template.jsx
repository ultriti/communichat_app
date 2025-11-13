import React, { useContext, useState } from 'react'
import { userDataContext } from '../../../../Contexts/UserContext'
import axios from 'axios'
import './Edit_profile_template.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeAuthUser, setAuthUser } from '../../../redux-store/counter/authSlice'
import { Await, Navigate, useNavigate, useParams } from 'react-router-dom'
import getStorage from 'redux-persist/es/storage/getStorage'


const Edit_profile_template = () => {
  const user_id_ = useParams();
  const dispatch = useDispatch();
  const { admin_details } = useSelector((state) => state.auth);

  const nav = useNavigate();


  const { toggle_edit_temp_fun } = useContext(userDataContext);
  const [edit_firstname, setedit_firstname] = useState('');
  const [edit_lastname, setedit_lastname] = useState('');
  const [edit_bio, setedit_bio] = useState('');

  const [selected_img_file_ppic, setselected_img_file_ppic] = useState({});
  const [selected_img_react_url, setselected_img_react_url] = useState('');
  const [isFileUploaded, setisFileUploaded] = useState(false);


  // get file data on chnage
  const browse_profile_pic_funtion = (e) => {
    const file = e.target.files[0];
    if (file) {

      setselected_img_file_ppic(file);
      setisFileUploaded(true);
    } else {
      console.log('No file selected');
    }
  };

  // display the seleted img funtion
  const display_selected_img_fun = () => {

    if (selected_img_file_ppic) {
      const selected_react_url = URL.createObjectURL(selected_img_file_ppic);
      setselected_img_react_url(selected_react_url);



    } else {
      return '';
    }
  }


  // const edit_admin_data_fun = async (e) => {
  //   e.preventDefault();

  //   if (!selected_img_file_ppic) {
  //     return
  //   }

  //   const reader = new FormData();
  //   reader.append('file', selected_img_file_ppic);
  //   reader.append('upload_preset', 'communichat_folder');
  //   reader.append('cloud_name', 'dqifawygq');

  //   const res = await fetch(`https://api.cloudinary.com/v1_1/dqifawygq/image/upload`, { method: 'POST', body: reader });
  //   const upload_img_url_admin = await res.json();
  //   console.log('profpic', upload_img_url_admin.url);


  //   const send_edited_data = {
  //     bio: edit_bio,
  //     Firstname: edit_firstname,
  //     Lastname: edit_lastname,
  //     profilePic: upload_img_url_admin.url
  //   }

  //   const axios_send_edit_profile_data = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/edit_user_profile`, send_edited_data, { withCredentials: true });

  //   if (axios_send_edit_profile_data.status === 200) {

  //     await dispatch(setAuthUser(axios_send_edit_profile_data.data.user_));

  //     alert(axios_send_edit_profile_data.data.msg);



  //     // toggle_edit_temp_fun();

  //   } else {
  //     alert('error in editing profile');
  //   }
  // }
  const edit_admin_data_fun = async (e) => {
    e.preventDefault();

    if (!selected_img_file_ppic) {
      return
    }

    const reader = new FormData();
    reader.append('file', selected_img_file_ppic);
    reader.append('upload_preset', 'communichat_folder');
    reader.append('cloud_name', 'dqifawygq');


    if (isFileUploaded == true) {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dqifawygq/image/upload`, { method: 'POST', body: reader });
      const upload_img_url_admin = await res.json();
      const send_edited_data = {
        bio: edit_bio,
        Firstname: edit_firstname,
        Lastname: edit_lastname,
        profilePic: upload_img_url_admin.url,
        profile_picture_id: upload_img_url_admin.public_id
      }


      const axios_send_edit_profile_data = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/edit_user_profile`, send_edited_data, { withCredentials: true });
      if (axios_send_edit_profile_data.status === 200) {
        alert(axios_send_edit_profile_data.data.user_.bio);
        dispatch(setAuthUser(axios_send_edit_profile_data.data.user_));
    

        alert(axios_send_edit_profile_data.data.msg);
        toggle_edit_temp_fun();

      } else {
        alert('error in editing profile');
      }
    };

    const send_edited_data = {
      bio: edit_bio,
      Firstname: edit_firstname,
      Lastname: edit_lastname,
      profilePic: '',
      profile_picture_id: ''
    }
    const axios_send_edit_profile_data = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/edit_user_profile`, send_edited_data, { withCredentials: true });


    if (axios_send_edit_profile_data.status === 200) {
      alert(axios_send_edit_profile_data.data.user_.bio);
      dispatch(setAuthUser(axios_send_edit_profile_data.data.user_));
      alert(axios_send_edit_profile_data.data.msg);
      toggle_edit_temp_fun();

    } else {
      alert('error in editing profile');
    }
  }



  return (
    <div className='Edit_profile_template_frame'>

      <div className="edit_profile_details_mainframe">


        {/* exit menu bar div */}
        <div className="edit_profile_temp_exit_bar">
          <button onClick={() => { toggle_edit_temp_fun() }}>x</button>
        </div>

        <div className="edit_admin_profile_data_frames">


          {/* left admin profile div */}
          <div className="edit_admin_profile_pic">

            <form action="" className="change_admin_profile_pic">

              <div className="profile_pic_display">
                <div className="display_seleted_img_ppic">
                  {
                    selected_img_react_url ? (

                      <img src={selected_img_react_url} alt="profile pic" />

                    ) : (
                      // <img src={selected_img_react_url} alt="profile pic" />
                      <img src={admin_details.profilePic} alt="profile pic" />

                    )
                  }
                </div>

              </div>
              <div className="profile_pic_import_btn_div">
                <input type="file" name='browse' onChange={browse_profile_pic_funtion} />
                <button type="button" onClick={() => { display_selected_img_fun() }}>choose</button>
              </div>

            </form>
            <div className="display_selected_profile_image_div">

              <div className="display_seleted_img_ppic">
                <img src={admin_details.profilePic} alt="profile pic" />
              </div>

            </div>

          </div>

          {/* right admin information div */}
          <div className="edit_admin_data_form">

            <form className='edit_profile_pic_form' onSubmit={edit_admin_data_fun}>

              <input type="text" className='edit_prop_pic_label' placeholder='firstName' value={edit_firstname} onChange={(e) => { setedit_firstname(e.target.value) }} />
              <input type="text" className='edit_prop_pic_label' placeholder='lastName' value={edit_lastname} onChange={(e) => { setedit_lastname(e.target.value) }} />
              <input type="text" className='edit_prop_pic_label' placeholder='bio' value={edit_bio} onChange={(e) => { setedit_bio(e.target.value) }} />

              <div className="edit_save_changes_btn_div">
                <button type="submit" className='edit_save_chnages_btn'>save changes</button>
              </div>


            </form>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Edit_profile_template
