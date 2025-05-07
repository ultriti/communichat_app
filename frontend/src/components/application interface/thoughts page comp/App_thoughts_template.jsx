import React from 'react'
import './App_thoughts_template.css'

const App_thoughts_template = (props) => {


    return (
        <div className='thoughts_template_frame_div'>

            <div className="thoughts_user_details_div">

                <div className="thought_user_profile_pic">
                    <img src={props.profilePic} alt="" />
                </div>
                <div className="thoughts_user_information_div">
                    <p>{props.Username}</p>
                </div>
                <div className="thoughts_user_info_edit_div">



                </div>

            </div>
            <div className="thought_display_div">
                <div className="thoughts_limit_dec">
                    <div className="thoughts_main_frame">

                        <div className="dec_main_line">
                            <p>{props.thoughts}</p>
                        </div>
                        
                    </div>
         
                </div>

            </div>


        </div>
    )
}

export default App_thoughts_template
