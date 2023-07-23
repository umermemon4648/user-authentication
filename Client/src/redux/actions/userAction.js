import {API_BASE_URL } from '../store' 
import axios from 'axios'



export const registerTheUser = (name, email, password) => async(dispatch)=>{
    try {
        dispatch({type: 'registerUserRequest'});
        const config = {headers: {'Content-Type': 'multipart/form-data'}, withCredentials : true}
        let url = `${API_BASE_URL}/newUser`
        const { data } = await axios.post(url,{name,email, password},config)

        dispatch({
            type: 'registerUserSuccess',
            payload: data
          })


    } catch (error) {

        dispatch({
            type: 'registerUserFail',
            payload: error.response.data.message
          })


    }
}


export const loginUser = (email, password) => async(dispatch)=>{
    try {
        dispatch({type: 'loginRequest'});
        const config = {headers: {'Content-Type': 'application/json'}}
        const { data } = await axios.post(`${API_BASE_URL}/loginUser`,
        {email, password},
        {withCredentials: true},
        config,
        )

        dispatch({
            type: 'loginSuccess',
            payload: data
          })


    } catch (error) {

        dispatch({
            type: 'loginFail',
            payload: error.response.data.message
          })


    }
}



export const getTheUserProfile = () => async(dispatch)=>{
    try {
        dispatch({type: 'loadUserRequest'});
        const { data } = await axios.get(`${API_BASE_URL}/me`,{withCredentials: true},)


        console.log("data = ",data);
        dispatch({
            type: 'loadUserSuccess',
            payload: data
          })


    } catch (error) {
        dispatch({
            type: 'loadUserFail',
            payload: error.response.data.message
          })


    }
}




export const logoutTheUser = () => async(dispatch)=>{
    try {
        dispatch({type: 'logoutUserRequest'});
        const { data } = await axios.post(`${API_BASE_URL}/logoutUser`,null,{withCredentials: true},)


        console.log("data1213 = ",data);
        dispatch({
            type: 'logoutUserSuccess',
            payload: data
          })


    } catch (error) {
        dispatch({
            type: 'logoutUserFail',
            payload: error.response.data.message
          })


    }
}