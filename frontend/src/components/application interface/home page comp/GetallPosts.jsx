import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { chnage_bool, setUpload } from '../../redux-store/counter/uploadsSlice';

const GetallPosts = () => {
    const { uploads,uplaods_bol } = useSelector((state) => state.uploads);
    const dispatch = useDispatch();

    
    const [page, setpage] = useState(1)
    const [data, setdata] = useState([])
    const [loading_bol, setloading_bol] = useState(false)

    // console.log('state _ _ upalods',uploads,uploads.length);
    
    // console.log('uplaods data:-----------> ',uploads[0] );
    // console.log('uplaods bol:-----------> ',uplaods_bol);
    

    // if (uploads.length <= 0) 
    // if (uplaods_bol === false)  
    //     {
    //         alert('hey flase');

        // useEffect(() => {
        //     const get_all_users_uploads = async () => {
              
        //         const axios_get_all_uplaods_ = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/get_all_uploads?page=${1}&limit=${6}`, { withCredentials: true });
             
        //         console.log('got data from bc',axios_get_all_uplaods_.data.posts);
                
        //         dispatch(setUpload(axios_get_all_uplaods_.data.posts));
        //         dispatch(chnage_bool(true))
        //         setdata(prev=>[...prev, ...axios_get_all_uplaods_.data.posts])
        //      }
        //      get_all_users_uploads();
        //     },[location.pathname])
    // }
    // else{
       
    
    useEffect(() => {

            const get_all_users_uploads = async () => {
                const axios_get_all_uplaods_ = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/get_all_uploads?page=${page}&limit=${1}`, { withCredentials: true });
                // console.log(axios_get_all_uplaods_.status);

                if(axios_get_all_uplaods_.status == 404){
                   navigate("/users/Login")
                }

                
                if(axios_get_all_uplaods_.status == 200){
                    // console.log('axios data:',axios_get_all_uplaods_.data.posts);
                    console.log('---> posts',axios_get_all_uplaods_.data.posts);
                    
                    setdata(prev => [...prev, ...axios_get_all_uplaods_.data.posts])
                    dispatch(setUpload(data));
                }
               
            }
            get_all_users_uploads();
        }, [page])

        const handleScroll = () => {
          
            // console.log('===> :',document.documentElement.scrollTop + window.innerHeight+2,'---',document.documentElement.scrollHeight);
        
            if (window.innerHeight + document.documentElement.scrollTop +2>= document.documentElement.scrollHeight) {
              setpage(prevPage => prevPage + 1);
            }
          }

          
          useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        
          }, [])
    // }


}

export default GetallPosts
