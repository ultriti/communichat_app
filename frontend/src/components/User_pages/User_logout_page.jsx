import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeAuthUser, setAuthUser } from '../redux-store/counter/authSlice'
import { setSocket } from '../redux-store/counter/socketSlice'

const User_logout_page = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const {admin_details} = useSelector(store=>store.auth)


  useEffect(() => {
    localStorage.removeItem('token_c')
    
  
    // dispatch(setSocket(null))
    dispatch(setAuthUser(null))
      nav('/users/register');
  }, [])
  

  return (
    <div className='user_logout_page'>
      
    </div>
  )
}

export default User_logout_page
