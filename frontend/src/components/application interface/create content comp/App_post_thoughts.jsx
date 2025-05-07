import axios from 'axios'
import React,{useState} from 'react'

const App_post_thoughts = () => {
    const [thoughts_input_state, setthoughts_input_state] = useState('')

    const app_post_thoughts_fun = async(e)=>{
      alert('post')

      e.preventDefault();
      const send_created_axios_data = {
        thoughts:thoughts_input_state
      }
        // fetch data from backend and post it to thoughts page
        const axios_post_thoughts_data = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/create_thoughts`,send_created_axios_data,{ withCredentials: true })

        
    }

  return (
    <div className='app_post_thoughts_frame'>

        <form onSubmit={app_post_thoughts_fun} >
            {/* -----------------------> post thought text area */}
            <textarea className="thought_input_area" value={thoughts_input_state} onChange={(e)=>{setthoughts_input_state(e.target.value)}} placeholder="Share your thoughts..."> </textarea>
            {/* -----------------------> post thought submit button */}
            <button type="submit" className="thought_post_btn">Post</button>

        </form>
      
    </div>
  )
}

export default App_post_thoughts
