import {API_BASE_URL } from '../store' 
import axios from 'axios'

export const updateProfile = (name, email) => async(dispatch)=>{
    try {
        dispatch({type:'updateProfileRequest'})
        const config = {headers: {'Content-Type':'application/json'}, withCredentials: true}
        const url = `${API_BASE_URL}/update-profile`
        const {data} = axios.put(url, {name,email}, config)

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





export const changePassowrd = (o_password, n_password) => async(dispatch)=>{
    try {
        dispatch({type:'changePasswordRequest'})
        const config = {headers: {'Content-Type':'application/json'}, withCredentials: true}
        const url = `${API_BASE_URL}/change-password`
        const {data} = axios.put(url, {o_password, n_password}, config)

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