import {API_BASE_URL } from '../store' 
import axios from 'axios'

export const updateTheProfile = (name, email) => async(dispatch)=>{
    try {
        dispatch({type:'updateProfileRequest'})
        const config = {headers: {'Content-Type':'application/json'}, withCredentials: true}
        const url = `${API_BASE_URL}/update-profile`
        const {data} = axios.put(url,  {name,email}, config)

        dispatch({
          
            type: 'updateProfileSuccess',
            payload: data
          })

    } catch (error) {

        dispatch({
            type: 'updateProfileFail',
            payload: error.response.data.message
          })
    }
}





export const changePassword = (oldPassword, newPassword) => async(dispatch)=>{
    try {
        dispatch({type:'changePasswordRequest'})
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
          let url = `${API_BASE_URL}/change-password`;
        //   const { data } = await axios.put(url, { o_password, n_password }, config);
          const { data } = await axios.put(url, { oldPassword, newPassword }, config );
        console.log("Change passwod: ", data);
          dispatch({
            type: 'changePasswordSuccess',
            payload: data
          })

    } catch (error) {

        dispatch({
            type: 'changePasswordFail',
            payload: error.response.data.message
          })
    }
}






export const changeAvatar = (formData) => async(dispatch)=>{
    try {
        dispatch({type:'updateAvatarRequest'})
        const config = {headers: {'Content-Type':'multipart/form-data'}, withCredentials: true}
        const url = `${API_BASE_URL}/update-user-avatar`
        const {data} = axios.put(url, formData, config)

        dispatch({
            type: 'updateAvatarSuccess',
            payload: data
          })

    } catch (error) {

        dispatch({
            type: 'updateAvatarFail',
            payload: error.response.data.message
          })
    }
}

// Forget Password

export const forgetThePassword = (email) => async(dispatch)=>{
  try {
      dispatch({type:'forgetPasswordRequest'})
      const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
        let url = `${API_BASE_URL}/forgot-password`;
        const { data } = await axios.post(url, { email }, config );
      console.log("forget the password: ", data);
        dispatch({
          type: 'forgetPasswordSuccess',
          payload: data
        })

  } catch (error) {

      dispatch({
          type: 'forgetPasswordFail',
          payload: error.response.data.message
        })
  }
}



// Reset Token 

export const resetThePasswordToken = (resetToken, password) => async(dispatch)=>{
  try {
      dispatch({type:'resetPasswordRequest'})
      const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
        let url = `${API_BASE_URL}/reset-password/${resetToken}`;
        const { data } = await axios.put(url, { password }, config );
      console.log("forget the password: ", data);
        dispatch({
          type: 'resetPasswordSuccess',
          payload: data
        })

  } catch (error) {

      dispatch({
          type: 'resetPasswordFail',
          payload: error.response.data.message
        })
  }
}