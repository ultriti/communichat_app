import React, { useEffect, useState } from 'react'
import './user_signup_page.css'
import '../../User_stylesheets//User_page_common.css'
import gsap from 'gsap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '../../redux-store/counter/authSlice'

const User_signup_page = () => {
    const { admin_details } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const navigate = useNavigate();

    const [user_username, setuser_username] = useState('');
    const [user_email, setuser_email] = useState('');
    const [user_password, setuser_password] = useState('');

    const [user_email_login, setuser_email_login] = useState('');
    const [user_password_login, setuser_password_login] = useState('');

    const [loadingBool, setloadingBool] = useState(false);




    // user login div animation enter
    const login_div_animaion_enter = (e) => {

                setloadingBool(false)


        setuser_username('');
        setuser_email('');
        setuser_password('');

        gsap.to('.login_frame_', {
            y: '-27vw',
            duration: 0.5,
            opacity: 1,
            borderTopLeftRadius: '4vw',
            borderTopRightRadius: '4vw',
            ease: 'power1.inOut'

        })
        gsap.to(".signup_title", {
            scale: 0.7,
            duration: 0.5,
            opacity: 1,

            ease: 'power1.inOut'
        })
        gsap.to(".login_title", {
            scale: 1.3,
            duration: 0.5,
            opacity: 1,
            ease: 'power1.inOut'
        })




    }

    // user login div animation leave
    const login_div_animaion_leave = (e) => {


        setuser_username('');
        setuser_email('');
        setuser_password('');


        gsap.to(".signup_title", {
            scale: 1,
            duration: 0.5,
            opacity: 1,
            ease: 'power1.inOut'
        })

        gsap.to(".login_title", {
            scale: 0.9,
            duration: 0.5,
            opacity: 1,

            ease: 'power1.inOut'
        })

        gsap.to('.login_frame_', {
            y: '-8vw',
            borderTopLeftRadius: '7vw',
            borderTopRightRadius: '7vw',
            duration: 0.5,
            opacity: 1,
            ease: 'power1.inOut'

        }
        )

    }

    // user signup function
    const user_register_fun = async (e) => {
        e.preventDefault();
        setloadingBool(true)


        const regitser_data_send = {
            Username: user_username,
            Email: user_email,
            Password: user_password
        }



        const axios_register_send = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, regitser_data_send, { withCredentials: true });

        console.log('data', axios_register_send.data.user);

        if (axios_register_send.status == 200) {
            alert('registered successful');
            localStorage.setItem("token_c", axios_register_send.data.token)
            dispatch(setAuthUser(axios_register_send.data.user));
            console.log('data 2', admin_details);
            setloadingBool(false);

            navigate('/users/home');
        } else {
            alert(axios_login_send.data.msg);
            setloadingBool(false);

        }


        setuser_username('');
        setuser_email('');
        setuser_password('');
    }

    // user login funtion 
    const user_login_fun = async (e) => {
        e.preventDefault();
        setloadingBool(true)


        const user_login_data_send = {
            Email: user_email_login,
            Password: user_password_login
        }
        console.log(import.meta.env.VITE_BASE_URL);

        try {
            const axios_login_send = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user_login_data_send, { withCredentials: true });

            

            if (axios_login_send.status == 200) {
                alert('login successful');
                localStorage.setItem("token_c", axios_login_send.data.token)
                setloadingBool(false)


                dispatch(setAuthUser(axios_login_send.data.user));
                navigate('/users/home');
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            setloadingBool(false)
        }
        
        setuser_username('');
        setuser_email('');
        setuser_password('');
    }


    return (
        <div className='user_signup_page_frame'>

            {/* user navbar */}
            {/* <div className="user_navbar_div">
                <User_navbar />
            </div> */}


            {/* user main frame div */}
            <div className="user_signup_mainframe" >

                <div className="main_form_frame">

                    <div className="singup_frame_">

                        <div className="signup_form">

                            <form onSubmit={user_register_fun}>

                                <div className="signup_title_div" onClick={() => { login_div_animaion_leave() }}>
                                    <p className="signup_title">
                                        Sign up
                                    </p>
                                </div>
                                <div className="signup_input_div">
                                    <input type="text" placeholder=' Username' value={user_username} onChange={(e) => { setuser_username(e.target.value) }} />
                                </div>
                                <div className="signup_input_div">
                                    <input type="email" placeholder=' Email' value={user_email} onChange={(e) => { setuser_email(e.target.value) }} />
                                </div>
                                <div className="signup_input_div">
                                    <input type="password" placeholder=' Password' value={user_password} onChange={(e => { setuser_password(e.target.value) })} />
                                </div>
                                <div className="signup_btn_div">

                                    {
                                        loadingBool ? (
                                            <div className="loader-container">
                                                <div className="pulse-loader">
                                                    <p>loading...</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <button className="singup_btn" type='submit'>
                                                Sign up
                                            </button>
                                        )
                                    }

                                </div>
                            </form>

                        </div>

                    </div>

                    <div className="login_frame_" onClick={() => { login_div_animaion_enter() }}>

                        <form onSubmit={user_login_fun}>
                            <div className="login_title_div" >
                                <p className="login_title">
                                    login in
                                </p>
                            </div>
                            <div className="signup_input_div login_input_div">
                                <input type="email" placeholder=' Email' value={user_email_login} onChange={(e) => { setuser_email_login(e.target.value) }} />
                            </div>
                            <div className="signup_input_div login_input_div">
                                <input type="password" placeholder=' Password' value={user_password_login} onChange={(e) => { setuser_password_login(e.target.value) }} />
                            </div>
                            <div className="signup_btn_div">
                                {
                                    loadingBool ? (
                                        <div className="loader-container">
                                            <div className="pulse-loader">
                                                <p>loading...</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <button className="singup_btn" type='submit'>
                                            log in
                                        </button>
                                    )
                                }

                            </div>

                        </form>

                    </div>

                </div>



            </div>
        </div>
    )
}

export default User_signup_page

{/*  */ }
{/* <div className="user_login_goto_div"  onClick={() => { login_div_animaion_enter() }}> */ }

{/* <div className="login_page_label_div_title">
                                <p className="login_title">Login</p>
                            </div> */}
{/* user login form */ }
{/* <div className="user_login_div">
                                <form className='login_form_div' onSubmit={user_login_fun}>


                                   
                                    <div className='login_page_label_div'>
                                        <input type="email" id="email_login" name="email" placeholder=' Enter your email' />
                                    </div>
                                    <div className='login_page_label_div'>
                                        <input type="password" id="password_login" name="password" placeholder=' Enter your password' />
                                    </div>

                                    <div className='login_btn_div'>
                                        <input type="submit" value="Login" className='login_buttons' />
                                    </div>

                                </form>
                            </div>  */}
{/* </div> */ }