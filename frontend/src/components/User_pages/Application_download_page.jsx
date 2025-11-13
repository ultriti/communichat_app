import React,{useEffect} from 'react'
import gsap from 'gsap';
import '../User_stylesheets/application_download_page.css'
import User_navbar from '../common_Routes/User_navbar'

import application_gui_img from '../../../public/images/application_gui_img.svg'
import application_gui_overlay from '../../../public/images/application_gui_overlay.svg'


const Application_download_page = () => {


    const OnmouseEnter_application_img = (e) =>{
      
      gsap.to('.img_container_div',{
        scale:1.1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        transform: 'translateX(-5vw) translateY(2vw) translateZ(5vw) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
        boxShadow:'0 0 20px rgb(58, 72, 72)'
      })

      gsap.to('.overlay_1',{
        scale:1.2,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        transform: 'translateX(-5vw) translateY(-33vw)'
      })
  
    }
    const Onmouseleave_application_img = (e) =>{
      
      gsap.to('.img_container_div',{
        scale:1.1,
        opacity: 1,
        duration: 0.5,
        ease: 'ease',
        transform: 'translateX(8vw) translateY(2vw) translateZ(5vw) rotateX(2deg) rotateY(-5deg) rotateZ(12deg)',
        boxShadow: '0 0 19px rgb(55, 79, 98)'

      })

      gsap.to('.overlay_1',{
        scale:0.60,
        opacity: 1,
        duration: 0.5,
        ease: 'easeOutExpo',
        transform: 'translateX(-1.02vw) translateY(-26.3vw)',
       
      })
  
    }



  return (
    <div className='application_download_page_frame'>

        <div className="Use_navbar_div">
            <User_navbar/>
        </div>


        <div className="application_download_page_mainframe">


            {/* left frame */}
            <div className="app_dpm_left_frame">

              <div className="app_dpm_left_frame_cont">

              </div>

            </div>

            {/* right frame */}
            <div className="app_dpm_right_frame">

                <div className="img_container_div" onMouseEnter={()=>{OnmouseEnter_application_img()}} onMouseLeave={()=>{Onmouseleave_application_img()}}>
                        <img src={application_gui_img} alt="" />
                        <img src={application_gui_overlay} alt="" className="overlay_1" />
                </div>

            </div>

        </div>
      
    </div>
  )
}

export default Application_download_page
