import React, { useContext, useEffect, useState } from 'react'
import './App_delete_uploads.css'
import { userDataContext } from '../../../Contexts/UserContext'
import axios from 'axios'
import { useSelector } from 'react-redux'

const App_delete_uploads = (props) => {
    const { admin_details } = useSelector((state) => state.auth);
    // const [isAdmin_uploads_, setisAdmin_uploads_] = useState(false)


    const { uplaods_more_info_toogle_, toggle_uplaods_more_info_frame, uploads_delete_id, isAdmin_uploads_ } = useContext(userDataContext)

    const delete_uplaods_fun = async () => {
        const send_delete_id_data = {}
        const axios_delete_uploads_server = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/delete_uploads/${uploads_delete_id}`, send_delete_id_data, { withCredentials: true });
        alert(axios_delete_uploads_server.data.msg);
        toggle_uplaods_more_info_frame()
    }




    return (
        <div className='app_delete_uploads_template'>
            {/* top exit bar */}
            <div className="app_delete_uploads_exit_bar">

                {/* delete post exit div */}
                <div className="app_delete_uploads_exit_icon">
                    <button onClick={() => { toggle_uplaods_more_info_frame() }}>x</button>
                </div>
            </div>


            <div className="app_delete_uploads_main_frame">
                <div className="app_home_uploads_more_options_div">
                    <p >share</p>
                </div>
                <div className="app_home_uploads_more_options_div" >
                    <p >add to bookmark</p>
                </div>
                <div className="app_home_uploads_more_options_div" onClick={() => { toggle_uplaods_overlay_info_fun(props.uploads._id, props.uploads.uploads) }}>
                    <p >visit upload</p>
                </div>

                {isAdmin_uploads_ ? (
                    <div className="app_home_uploads_more_options_div" onClick={() => { delete_uplaods_fun() }}>
                        <p >delete</p>
                    </div>
                ) : (<></>)}
            </div>





        </div>
    )
}

export default App_delete_uploads
