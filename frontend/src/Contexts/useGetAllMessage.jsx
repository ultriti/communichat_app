import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../components/redux-store/counter/chatSlice'

const useGetAllMessage = () => {
    const dispatch = useDispatch()
    const { selected_user } = useSelector((state) => state.auth);
    const { messages } = useSelector(store => store.onlineUsers)
    
    useEffect(() => {
      
            const fetchAllMessage = async () => {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/message/getMessage/${selected_user._id}`, { withCredentials: true });
                if (res.status == 200) {
                    dispatch(setMessages(res.data.messages));
                }else{
                    console.log('--->error',res.sata.message);
                }
            }
        fetchAllMessage()
    }, [selected_user,messages])

}

export default useGetAllMessage
