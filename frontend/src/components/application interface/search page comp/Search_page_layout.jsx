import React, { useState } from 'react'
import './search_page_layout.css'
import search_white_icon from '../../../../public/images/search_white_icon.svg'
import axios from 'axios'
import Username_search_template from './Username_search_template'

const Search_page_layout = () => {

  const [search_bar_state, setsearch_bar_state] = useState('')
  const [type_searched, settype_searched] = useState({})
  const [users_search_results, setusers_search_results] = useState([])


  const find_searched_item_fun = async (e) => {
    e.preventDefault();
    const send_data_to_search = {

    }

    const axios_send_find_req = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/search_items_?Username=${search_bar_state}&$limit=${5}`, send_data_to_search, { withCredentials: true })

    if (axios_send_find_req.status == 200) {
      setusers_search_results(axios_send_find_req.data.find_username)

    }







  }

  return (
    <div className='search_page_layout_frame'>


      {/* app search bar div and slider  */}
      <div className="search_page_search_bar_div">

        <form onSubmit={find_searched_item_fun} className="search_page_searchbar_form">
          <div className="search_bar_contianer_topandfilters">
            <div className="search_bar_label_div">
              <label htmlFor=""><input type="text" placeholder='search accounts' value={search_bar_state} onChange={(e) => { setsearch_bar_state(e.target.value) }} /></label>

              <div className="find_search_btn_div">
                <button type="submit"><img src={search_white_icon} alt="" /></button>
              </div>

            </div>
          </div>

          <div className="search_filter_label_div">

          </div>
        </form>
        {/* username display div */}
        <div className="search_display_searched_usernames">

          {
            users_search_results.map((user_details, index) => (
              <div className="display_username_template_div" key={index}>
                <a href={`/users/profile/${user_details._id}`}>
                <Username_search_template user_Username={user_details.Username} user_name_f={user_details.Fullname.Firstname} user_name_l={user_details.Fullname.Lastname} user_profilePic={user_details.profilePic} />  
                </a>
              </div>
           
            ))
          }
        </div>
      </div>



      {/* app searched item list given here */}
      <div className="search_page_display_serched_item_div">
          
          <div className="search_page_slide_bar_div">

          </div>

          <div className="search_page_display_all_itema_frame">
            
          </div>
          

      </div>


    </div>
  )
}

export default Search_page_layout
