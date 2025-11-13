// useGetAllMessage.js
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../components/redux-store/counter/chatSlice'

const useGetAllMessage = () => {
  const dispatch = useDispatch()
  const { selected_user } = useSelector(state => state.auth)

  const fetchMessages = async () => {
    if (!selected_user?._id) return
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/message/getMessage/${selected_user._id}`, {
        withCredentials: true
      })
      if (res.status === 200) {
        dispatch(setMessages(res.data.messages))
      }
    } catch (err) {
      console.error('Error fetching messages:', err.message)
    }
  }

  return fetchMessages
}

export default useGetAllMessage
