import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserWrapperContext = ({children}) => {
    const nav = useNavigate()
    const [auth_user_boolen, setAuth_userBoolen] = useState(false);


    const token = localStorage.getItem('token_c')

    useEffect(() => {
        if (token) {
          console.log(token);
          setAuth_userBoolen(true);
        } else {
          setAuth_userBoolen(false);
          nav('/users/register');

          
        }
      }, [token]);
      return auth_user_boolen ? <>{children}</> : null;


}

export default UserWrapperContext
