import React from 'react'
import './App_uploads_layout_template.css'
import gsap from 'gsap'


const App_uploads_layout_template = (props) => {


    const uplaods_curser_enter_funtion = () =>{
        
        gsap.to(`.uplaods_hover_overlay_div_${props.key_}`,{
            duration:0.6,
            transform:'translateX(0px)'
        })
    }
    const uplaods_curser_leave_funtion = () =>{
        
        gsap.to(`.uplaods_hover_overlay_div_${props.key_}`,{
            duration:0.6,
            transform:'translateX(420px)'
        })
    }




    return (
        <div className='app_uploads_template_frame'>



            <div className={`uplaods_display_div uplaods_display_div_${props.key_}`} onMouseEnter={()=>{uplaods_curser_enter_funtion()}} onMouseLeave={()=>{uplaods_curser_leave_funtion()}}>
                <img src={props.profile_uploads_url} alt="" />
            </div>
            <div className={`uplaods_hover_overlay_div uplaods_hover_overlay_div_${props.key_}`} onMouseEnter={()=>{uplaods_curser_enter_funtion()}} onMouseLeave={()=>{uplaods_curser_leave_funtion()}}>

                <div className="uploads_hover_display_fetaures_div">
                    <p className='uploads_likes_para'>
                        <span className="uploads_likes_para_san">{props.profile_uploads_likes}</span> likes
                        </p>
                        <p className='uploads_likes_para'>
                        <span className="uploads_likes_para_san">{props.profile_uploads_comments}</span> comments
                    
                        </p>
                        

                </div>

            </div>




        </div>
    )
}

export default App_uploads_layout_template
