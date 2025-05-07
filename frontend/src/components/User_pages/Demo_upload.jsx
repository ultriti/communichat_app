import axios from 'axios';
import React, { useState } from 'react';

const Demo_upload = () => {
  const [file, setFile] = useState(null);
  const [bio, setbio] = useState('');
  const [gen, setgen] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset','upload_file_demo_1');
    formData.append('cloud_name','dqifawygq');
    
    const res =  await fetch(`https://api.cloudinary.com/v1_1/dqifawygq/image/upload`,{method:'POST',body:formData});
    const upload_img_url = await res.json();
    
    const send_edit = {
        bio,
        Gender:gen,
        profile_picture:upload_img_url.url
  
    }

    const demo_upload = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/edit_user_profile`,send_edit,{withCredentials:true})

    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder='bio' value={bio} onChange={(e)=>{setbio(e.target.value)}} />
      <input type="text" placeholder='gender' value={gen} onChange={(e)=>{setgen(e.target.value)}} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Demo_upload;