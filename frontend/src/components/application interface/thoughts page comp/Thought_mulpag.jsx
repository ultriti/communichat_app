import React, { useState, useEffect } from 'react'
import './thought_mulpag.css'
import App_thoughts_template from './App_thoughts_template'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const Thought_mulpag = () => {
    const [get_all_thoughts_, setget_all_thoughts_] = useState([])

    useEffect(() => {

        const get_all_thoughts_fun = async (req, res) => {

            const axios_get_all_thoughts = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/get_all_thoughts`, { withCredentials: true })
       


            if (axios_get_all_thoughts.status == 200) {
                setget_all_thoughts_(axios_get_all_thoughts.data.thoughts_data)
            }

        }
        get_all_thoughts_fun()
    }, [])




    return (
        <div className='toughts_display_multiple_slides'>
            {/* user basic features */}
            <div className="thoughts_top_basic_fetures_div">
                <NavLink to={'#'}>all</NavLink>
                <NavLink to={'#'}>selected</NavLink>

            </div>

            {/* thoughts display all div */}
            <div className="thoughts_display_frame">

                {
                    get_all_thoughts_.map((though, index) => (

                        <div className="thoughts_template_frame" >
                            <App_thoughts_template profilePic={though.author.profilePic} Username={though.author.Username} thoughts={though.thoughts} />
                         
                        </div>

                    ))
                } 


            </div>

        </div>
    )
}

export default Thought_mulpag
