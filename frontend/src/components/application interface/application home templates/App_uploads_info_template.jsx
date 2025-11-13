import React, { useContext, useEffect, useState } from "react";
import "./App_uploads_info_template.css";
import { userDataContext } from "../../../Contexts/UserContext";
import app_send_data from "../../../../public/images/app_send_data.svg";
import axios from "axios";
import { Link } from "react-router-dom";

const App_uploads_info_template = (props) => {
  const { toggle_uplaods_overlay_info_fun, get_uploads_details } =
    useContext(userDataContext);
  const [uploads_comments_details_state, setuploads_comments_details_state] =
    useState([]);

  const [comment_text, setcomment_text] = useState("");

  const axios_send_comment_data_fun = async (e) => {
    e.preventDefault();

    const send_comments_ = {
      comment: comment_text,
    };

    const axios_send_comment_data = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/create_comment/${
        get_uploads_details.get_uplaods_info
      }`,
      send_comments_,
      { withCredentials: true }
    );

    setcomment_text("");
  };

  const get_all_comments_uplaods = async () => {
    const send_data = {};
    const axios_send_comment_data = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/get_all_comments/${
        get_uploads_details.get_uplaods_info
      }`,
      { withCredentials: true }
    );

    setuploads_comments_details_state(
      axios_send_comment_data.data.uploads_details
    );
  };

  useEffect(() => {
    get_all_comments_uplaods();
  }, [location.pathname]);

  return (
    <div className="app_uploads_info_template_frame">
      <div className="app_uploads_info_overlay_main_frame">
        {/* ------------ uploads left information  */}
        <div className="left_display_image_div">
          <div className="display_uploads_img_show">
            <img
              src={get_uploads_details.get_uploads_profile_pic}
              alt="hry"
              onClick={() => {
                toggle_uplaods_overlay_info_fun();
              }}
            />
          </div>
        </div>

        {/* ------------ uploads right information  */}
        <div className="right_uploads_information_div">
          <div className="show_all_comments_div">
            <div className="display_uploads_comments_template">
              <div className="display_uploads_comments_user_profile_pic">
                <img
                  src={get_uploads_details.get_uploads_author_ppic}
                  alt="hry"
                />
              </div>
              <p className="display_uploads_comments_username">
                {get_uploads_details.get_uploads_username}
              </p>
              <div className="display_uploads_edit_btn_div"></div>
            </div>

            <div className="display_all_comments_scroll_div">
              <div className="display_all_comments_scroll_mainframe">
                {uploads_comments_details_state.length ? (
                  uploads_comments_details_state.map((comment_text, index) => {
                    return (
                      <div
                        className="display_comment_template_frame"
                        key={index}
                      >
                        <div className="display_comment_template_user_profile_pic">
                          <img src={comment_text.author.profilePic} alt="hry" />
                        </div>

                        <p className="display_uploads_template_comments_username ">
                          <span className="display_commented_username">
                            <Link
                              to={`/users/profile/${comment_text.author._id}`}
                              className="link_user_profiles"
                              onClick={() => {
                                toggle_uplaods_overlay_info_fun();
                              }}
                            >
                              {comment_text.author.Username}
                            </Link>
                          </span>{" "}
                          :{" "}
                          <span className="uploads_comments">
                            {" "}
                            {comment_text.comment}
                          </span>
                        </p>

                        <div className="display_uploads_edit_btn_div">
                          {/* Add any additional elements or functionality here */}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="display_all_comments_scroll_div">
                    <p className="no_comments_text">No comments yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* -------------- uploads all comments div ----------------------*/}
          <div className="add_uploads_features_div">
            <div className="uploads_features_frame"></div>
            {/* --------------- uplaod comment form */}
            <div className="uploads_comment_frame">
              <form onSubmit={axios_send_comment_data_fun}>
                <div className="uploads_post_comment_label">
                  <label>
                    <textarea
                      name="add comment"
                      value={comment_text}
                      onChange={(e) => {
                        setcomment_text(e.target.value);
                      }}
                      placeholder=" write a comment"
                      className="textarea_add_comment"
                      maxLength={250}
                    ></textarea>
                  </label>
                </div>
                <button className="uploads_post_comment_logo_div" type="submit">
                  <img src={app_send_data} alt="" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App_uploads_info_template;
