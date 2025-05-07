import React from 'react'
import '../User_stylesheets/User_scearch_page.css'
import '../User_stylesheets/User_page_common.css'
import User_navbar from './User_navbar'
import User_sidebar from './User_sidebar'
import Search_page_layout from '../application interface/search page comp/Search_page_layout'

const User_scearch_page = () => {
  return (
    <div className='User_scearch_page_frame'>
        {/* user main frame */}

        <div className="user_main_frame_">


            <div className="user_sidebar_1_">
                <User_sidebar/>
            </div>

            <div className="main_cont_frame_">
                <Search_page_layout/>

            </div>

        </div>

      
    </div>
  )
}

export default User_scearch_page
