import React from 'react'
import './Username_search_template.css'

const Username_search_template = (props) => {
    return (
        <div className='username_search_temp_frame'>

            <div className="searched_user_profilepic_div">
                <img src={props.user_profilePic} alt="" />
            </div>
            <div className="searched_user_Username_div">
                <p className="searched_username_p">
                    {props.user_Username}
                </p>
                <p className="searched_name_p">
                    {props.user_name_f} {props.user_name_l}
                </p>
            </div>

        </div>
    )
}

export default Username_search_template
