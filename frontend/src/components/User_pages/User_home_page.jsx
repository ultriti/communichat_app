import React, { useContext } from 'react'
// import '../User_stylesheets/User_home_page.css'
import '../User_stylesheets/User_home_page_2.css'
import '../User_stylesheets/User_page_common.css'
import User_sidebar from './User_sidebar'
import App_home_pagelayout from '../application interface/home page comp/App_home_pagelayout'

const User_home_page = () => {

 
  
  // return (
  //   <div className='communichat_home_frame'>

  //     {/* user navbar */}
  //     {/* <div className="user_navbar_frame">
  //       <User_navbar />

  //     </div> */}

  //     {/* user main frame */}
  //     <div className="user_main_frame">

  //       <div className="user_sidebar_1">
  //         <User_sidebar />
  //       </div>


  //       {/* <div className="main_cont_frame">
  //         <App_home_pagelayout/>
  //       </div> */}
  //       <div className="main_cont_frame">
  //         <App_home_pagelayout/>
  //       </div>

  //     </div>


  //   </div>
  // )


  // -------------------
 
 
  return (
    <div className='communichat_home_frame_'>

      <div className="app_side_bar_div">
        <User_sidebar/>
      </div>
      
      <div className="main_cont_div">
        <App_home_pagelayout/>

      </div>



    </div>
  )
}

export default User_home_page
