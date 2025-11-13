import React from 'react'
import './App_thoughts_page.css'
import User_sidebar from '../../common_Routes/User_sidebar'
import tho from './App_thoughts_template'
import Thought_mulpag from './thought_mulpag'


const App_thoughts_page = () => {
  return (
    <div className='app_thoughts_page_frame'>

      {/* ------------------------->  user side bar div */}
      <div className="app_thoughts_side_bar_div">
        <User_sidebar />
      </div>

      {/* ------------------------> thoughts main frame */}
      <div className="app_thoughts_main_frame_div">

        {/* -----------------------> toughts all display frame */}
        <div className="thoughts_left_div_all_thoughts">
          <Thought_mulpag />
        </div>

        {/* -------------------------> thoughts right frame - sorted div  */}
        <div className="thoughts_right_div_sorted_thoughts">

        </div>

      </div>
    </div>
  )
}

export default App_thoughts_page
