import React, { useState } from 'react'
import './search_page_layout.css'
import search_white_icon from '../../../../public/images/search_white_icon.svg'
import axios from 'axios'
import Username_search_template from './Username_search_template'
import App_uploads_layout_template from '../profile page comp/App_uploads_layout_template'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../common_Routes/Loading';


const Search_page_layout = () => {

  const navigate = useNavigate()
  const { uploads } = useSelector((state) => state.uploads);
  const { rtnLikeNotification_ } = useSelector((state) => state.rtnLikeNotification);

  const [search_bar_state, setsearch_bar_state] = useState('')
  const [type_searched, settype_searched] = useState({})
  const [users_search_results, setusers_search_results] = useState([])
  const [setfilterSearch, setsetfilterSearch] = useState("")
  const filterSearch = ["accounts", "uploads", "Thoughts"]
  const [isLoading, setisLoading] = useState(false)


  const find_searched_item_fun = async (e) => {
    e.preventDefault();
    setisLoading(true)
    const send_data_to_search = {}


    if (setfilterSearch == "") {
      setsetfilterSearch("accounts")
      const axios_send_find_req = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/search_items_?Username=${search_bar_state}&$limit=${5}`, send_data_to_search, { withCredentials: true })

      if (axios_send_find_req.status == 404) {
        navigate("/users/Login")
      }

      if (axios_send_find_req.status == 200) {
        setusers_search_results(axios_send_find_req.data.find_username)
        setisLoading(false)
      }

    }
    else {
      setsetfilterSearch(setfilterSearch)
      setisLoading(false)
    }

    if (setfilterSearch == 'accounts') {
      const axios_send_find_req = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/search_items_?Username=${search_bar_state}&$limit=${5}`, send_data_to_search, { withCredentials: true })

      if (axios_send_find_req.status == 200) {
        setusers_search_results(axios_send_find_req.data.find_username)
        setisLoading(false)
      }
    }
  }

  return (
    <div className='search_page_layout_frame'>


      {/* app search bar div and slider  */}
      <div className="search_page_search_bar_div">

        <div className="notification_notify_frame">
          <p>you have got {rtnLikeNotification_.length} Notifications </p>
        </div>


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

            {
              filterSearch ? (

                filterSearch.map((filter, i) => (
                  <>
                    <div className={
                      filter == setfilterSearch ? "filterSearch_div filterSearch_div_hightlight" : "filterSearch_div "
                    } onClick={() => { setsetfilterSearch(filter) }}>
                      <p>{filter}</p>
                    </div>
                  </>
                ))

              ) : (<>
                <p>no result found</p>
              </>)
            }

          </div>
        </form>
        {/* username display div */}
        <div className="search_display_searched_usernames">
          <div className="search_display_searched_usernames_cont">
            {
              isLoading ? (
                <div className="loading_Search">
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  {
                    users_search_results ? (

                      users_search_results.map((user_details, index) => (
                        <div className="display_username_template_div" key={index} onClick={() => {
                          navigate(`/users/profile/${user_details._id}`)
                        }}>

                          <Username_search_template user_Username={user_details.Username} user_name_f={user_details.Fullname.Firstname} user_name_l={user_details.Fullname.Lastname} user_profilePic={user_details.profilePic} />

                        </div>

                      ))

                    ) : (
                      <>
                        <p>no result found</p>
                      </>
                    )
                  }
                </>)
            }


          </div>

        </div>
      </div>



      {/* app searched item list given here */}
      <div className="search_page_display_serched_item_div">

        <div className="search_page_slide_bar_div">

        </div>

        <div className="search_page_display_all_itema_frame">


          {
            uploads ? (


              uploads.map((upload, i) => (


                <div className="searchUploadFrame">

                  <App_uploads_layout_template profile_uploads_likes={upload.likes.length} profile_uploads_comments={upload.comments.length} profile_uploads_url={upload.uploads} key_={i} />

                </div>
              ))

            ) : (<><p>no uploads</p></>)

          }
        </div>


      </div>


    </div>
  )
}

export default Search_page_layout
