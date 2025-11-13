import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';


const UserWrapperContext = ({ children }) => {
  const nav = useNavigate()
  const [auth_user_boolen, setAuth_userBoolen] = useState(false);

  // const getCookie = (name) => {
  //   console.log('-:',name);
  //   console.log('-->',Cookies.get(name));
    
  //   return Cookies.get(name);
  // };

  // console.log(getCookie('token'));


  //   const getCookie = (name) => {
  //     let cookies = document.cookie.split(';');
  //     for (let cookie of cookies) {
  //         let [key, value] = cookie.trim().split('=');
  //         if (key === name) {
  //             return value;
  //         }
  //     }
  //     return null;
  // };

  //   console.log(getCookie('token'));

  const token = localStorage.getItem('token_c')

  useEffect(() => {
    if (token) {
      setAuth_userBoolen(true);
    } else {
      setAuth_userBoolen(false);
      nav('/users/register');


    }
  }, [token]);
  return auth_user_boolen ? <>{children}</> : null;


}

export default UserWrapperContext
