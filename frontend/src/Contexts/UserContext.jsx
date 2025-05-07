import React, { createContext, useState } from 'react'
import gsap from 'gsap'
import { useSelector } from 'react-redux'


export const userDataContext = createContext()

const UserContext = ({ children }) => {
    const { admin_details } = useSelector((state) => state.auth);

  const [user, setUser] = useState('hello')
  const [edit_admin_toggle, setedit_admin_toggle] = useState(false);
  const [toggleEdittemplate_div, settoggleEdittemplate_div] = useState(true);
  const [uplaods_more_info_toogle_, setuplaods_more_info_toogle_] = useState(false);
  const [uploads_delete_id, setuploads_delete_id] = useState('')
  const [uploads_author_id, setuploads_author_id] = useState('')
  const [isAdmin_uploads_, setisAdmin_uploads_] = useState(false)
  const [isUploads_display_info, setisUploads_display_info] = useState(false)
  const [get_uploads_details, setget_uploads_details] = useState({})
  const [emojiTempToggle, setemojiTempToggle] = useState(false)
  const [sendMoreOptionsToggle, setsendMoreOptionsToggle] = useState(false)


  const toggle_uplaods_more_info_frame = (uploads_id, uploads_author) => {
    console.log("--->",uploads_id);
    
    setuploads_delete_id(uploads_id);
    if (uploads_author ===  admin_details.userId) {
      setisAdmin_uploads_(true)
    } else {
      setisAdmin_uploads_(false)
    }
    setuplaods_more_info_toogle_(!uplaods_more_info_toogle_);
    if (uplaods_more_info_toogle_) {
      // gsap.to('.user_home_uploads_overlay', { opacity: 0, duration: 0.5,visibility: 'visible' });
    } else {
      // gsap.to('.user_home_uploads_overlay', { opacity: 1, duration: 0.5, visibility: 'hidden' });
    }


  }


  const toggle_edit_temp_fun = (e) => {

    settoggleEdittemplate_div(!toggleEdittemplate_div);
    if (toggleEdittemplate_div === true) {
      gsap.to('.overlay_profile_page_', {
        opacity: 1,
        zIndex: 25,
        position: 'absolute',

      })
   
    } else {
      gsap.to('.overlay_profile_page_', {
        opacity: 0,
        zIndex: -1,
        position: 'none',
      });
     
      window.location.reload();
    }
  }


  const toggle_uplaods_overlay_info_fun = (get_uplaods_info,get_uploads_profile_pic,get_uploads_author_ppic,get_uploads_username) => {
    // console.log('======>fun tion ---=p-=-=-0askgdukaj: - ',get_uplaods_info,get_uploads_profile_pic,get_uploads_author_ppic,get_uploads_username);
    
    setisUploads_display_info(!isUploads_display_info)
    setget_uploads_details({get_uplaods_info,get_uploads_profile_pic,get_uploads_author_ppic,get_uploads_username})
  }

  // toggle emoji template 
  const toggle_Emoji_frame_fun = ()=>{
    setemojiTempToggle(!emojiTempToggle)
  }
  const toggle_Emoji_frame_fun_ = ()=>{
    setemojiTempToggle(false)
  }

  // toggle emoji template 
  const toggle_sendmoreOptions_frame_fun = ()=>{
    setsendMoreOptionsToggle(!emojiTempToggle)
  }
  const toggle_sendmoreOptions_frame_fun_ = ()=>{
    setsendMoreOptionsToggle(false)
  }
  

  return (
    <userDataContext.Provider value={{ toggle_sendmoreOptions_frame_fun,toggle_sendmoreOptions_frame_fun_,toggle_Emoji_frame_fun,toggle_Emoji_frame_fun_,emojiTempToggle,user, setUser, edit_admin_toggle, setedit_admin_toggle, toggle_edit_temp_fun, setuplaods_more_info_toogle_, uplaods_more_info_toogle_, toggle_uplaods_more_info_frame ,isAdmin_uploads_,uploads_delete_id,isUploads_display_info,get_uploads_details,toggle_uplaods_overlay_info_fun,toggleEdittemplate_div}}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext