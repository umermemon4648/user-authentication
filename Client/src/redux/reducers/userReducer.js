import {createReducer } from '@reduxjs/toolkit'

export const userReducer = createReducer({},{

    registerUserRequest: (state)=>{
        state.loading = true
    },
    registerUserSuccess: (state,action)=>{
        state.loading = false
        state.isAuthenticate = true
        state.user = action.payload.user
        state.message = action.payload.message
    },
    registerUserFail: (state, action)=>{
        state.loading = false
        state.isAuthenticate = false
        state.error = action.payload
    },



    loginRequest: (state)=>{
        state.loading = true
    },
    loginSuccess: (state,action)=>{
        state.loading = false
        state.isAuthenticate = true
        state.user = action.payload.user
        state.message = action.payload.message
        state.success = action.payload.success
    },
    loginFail: (state, action)=>{
        state.loading = false
        state.isAuthenticate = false
        state.error = action.payload
    },




    loadUserRequest: (state)=>{
        state.loading = true
    },
    loadUserSuccess: (state,action)=>{
        state.loading = false
        state.isAuthenticate = true
        state.user = action.payload.user
        state.message = action.payload.message
        state.success = action.payload.success
    },
    loadUserFail: (state, action)=>{
        state.loading = false
        state.isAuthenticate = false
        state.error = action.payload
    },





    logoutUserRequest: (state)=>{
        state.loading = true
    },
    logoutUserSuccess: (state, action)=>{
        state.loading = false
        state.isAuthenticate = false
        state.user = null
        state.message = action.payload.message
    },
    logoutUserFail: (state, action)=>{
        state.loading = false
        state.isAuthenticate = false
        state.error = action.payload
    },




    clearError: (state)=>{
        state.error = null
    },
    clearMessage: (state)=>{
        state.message = null
    },
})