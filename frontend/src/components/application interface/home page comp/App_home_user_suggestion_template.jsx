import React from 'react'
import './App_home_user_suggestion_template.css'
import ssm1 from '../../../../public/images/ssm1.svg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from '../../redux-store/store'

const App_home_user_suggestion_template = (props) => {

  const user_id_ = props.user_id;
  const admin_id = props.admin_id;


  


  return (
    <div className='user_suggestion_template_frame'>
      <Link to={`/users/profile/${user_id_}`} className='link_user_profiles'>

        <div className="user_suggestion_profile_pic_div">
          <img src={props.profilePic} alt="" />

        </div>
        <div className="user_suggested_username_div">

          <p className="u_s_username_p">
            <span className="u_s_username_span">{props.Username}</span>
          </p>
          <p className="u_s_fnf_p">
            <span className="u_s_username_span">{props.Firstname} {props.Lastname}</span>
          </p>

        </div>
        <div className="user_suggetion_track_fnf_div">
          {
            admin_id ? (
              <>
                <p className="fnf_p">
                  <span></span>
                </p>


              </>
            ) : <p className="fnf_p">
              <span className="fnf_span">connect</span>
            </p>
          }

        </div>
      </Link>


    </div>
  )
}

export default App_home_user_suggestion_template
