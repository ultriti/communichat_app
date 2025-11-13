import React, { useState } from 'react';
import './RegisterForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthUser } from '../../redux-store/counter/authSlice';
import LoadingSpinner from '../../common_Routes/Loading';


const LoginPage = () => {

    const { admin_details } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const navigate = useNavigate();

    const [user_email, setuser_email] = useState('');
    const [user_password, setuser_password] = useState('');


    const [loadingBool, setloadingBool] = useState(false);



    // user login funtion 
    const user_login_fun = async (e) => {
        e.preventDefault();
        setloadingBool(true)


        const user_login_data_send = {
            Email: user_email,
            Password: user_password
        }
        console.log(import.meta.env.VITE_BASE_URL);

        try {
            const axios_login_send = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user_login_data_send, { withCredentials: true });



            if (axios_login_send.status == 200) {
                alert('login successful');
                localStorage.setItem("token_c", axios_login_send.data.token)
                setloadingBool(false)


                dispatch(setAuthUser(axios_login_send.data.user));
                localStorage.setItem("userId",axios_login_send.data.user.userId)
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
        <div className="register-wrapper">

            <div className="RegisterCont">
                <form className="register-form" onSubmit={user_login_fun}>
                    <h2>Login in</h2>
              
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user_email}
                        onChange={(e) => { setuser_email(e.target.value) }}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user_password}
                        onChange={(e) => { setuser_password(e.target.value) }}
                        required
                    />
                    {
                        loadingBool ? (
                            <>
                            <div className="loading_frame">
                                <LoadingSpinner/>
                            </div>
                              
                            </>
                        ) : (
                            <button type="submit">Login</button>

                        )
                    }


                    <div className='RouteFrame' onClick={()=>{
                        navigate(`/users/register`)
                    }}>
                        <p>if doesnt already have an account ? </p> <p className='routePath'>Sign up</p>
                    </div>
                </form>


            </div >

        </div >
    )
}

export default LoginPage
