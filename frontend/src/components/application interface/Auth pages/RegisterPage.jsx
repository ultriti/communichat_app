import React, { useState } from 'react';
import './RegisterForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthUser } from '../../redux-store/counter/authSlice';
import LoadingSpinner from '../../common_Routes/Loading';

const RegisterForm = () => {
    const { admin_details } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const navigate = useNavigate();

    const [user_username, setuser_username] = useState('');
    const [user_email, setuser_email] = useState('');
    const [user_password, setuser_password] = useState('');


    const [loadingBool, setloadingBool] = useState(false);


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
            localStorage.setItem("userId", axios_login_send.data.user.userId)
            navigate('/users/home');
        } else {
            alert(axios_login_send.data.msg);
            setloadingBool(false);

        }


        setuser_username('');
        setuser_email('');
        setuser_password('');
    }

    return (
        <div className="register-wrapper">

            <div className="RegisterCont">
                <form className="register-form" onSubmit={user_register_fun}>
                    <h2>Sign Up</h2>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={user_username}
                        onChange={(e) => { setuser_username(e.target.value) }}
                        required
                    />
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
                                <LoadingSpinner />
                            </>
                        ) : (
                            <button type="submit">Create Account</button>
                        )
                    }


                    <div className='RouteFrame' onClick={() => {
                        navigate("/users/Login")
                    }}>
                        <p>if already have an account ? </p> <p className='routePath'>login</p>
                    </div>
                </form>


            </div >

        </div >
    );
};

export default RegisterForm;
