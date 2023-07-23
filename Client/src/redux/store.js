import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer'
import { profileReducer } from './reducers/profileReducer'

const store = configureStore({
    reducer:{
        user: userReducer,
        profile: profileReducer
    }
})
// export default the store 
export default store


export const API_BASE_URL = `http://localhost:5000/api/auth`