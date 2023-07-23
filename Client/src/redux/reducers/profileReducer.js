import {createReducer } from '@reduxjs/toolkit'
export const profileReducer = createReducer({},{
    updateProfileRequest: (state)=>{
        state.loading = true
        state.isUpdated = false
    },
    updateProfileSuccess: (state,action)=>{
        state.loading = false
        state.isUpdated = true
        state.p_message = action.payload.message
    },
    updateProfileFail: (state, action)=>{
        state.isUpdated = false
        state.loading = false
        state.p_error = action.payload
    },


    changePasswordRequest: (state)=>{
        state.loading = true
        state.isUpdated = false
    },
    changePasswordSuccess: (state,action)=>{
        state.loading = false
        state.isUpdated = true
        state.p_message = action.payload.message
    },
    changePasswordFail: (state, action)=>{
        state.isUpdated = false
        state.loading = false
        state.p_error = action.payload
    },



    forgetPasswordRequest: (state)=>{
        state.loading = true
        state.isUpdated = false
    },
    forgetPasswordSuccess: (state,action)=>{
        state.loading = false
        state.isUpdated = true
        state.p_message = action.payload.message
    },
    forgetPasswordFail: (state, action)=>{
        state.isUpdated = false
        state.loading = false
        state.p_error = action.payload
    },



    resetPasswordRequest: (state)=>{
        state.loading = true
        state.isSent = false
    },
    resetPasswordSuccess: (state,action)=>{
        state.loading = false
        state.isSent = true
        state.p_message = action.payload.message
    },
    resetPasswordFail: (state, action)=>{
        state.isSent = false
        state.loading = false
        state.p_error = action.payload
    },










    updateAvatarRequest: (state)=>{
        state.loading = true
    },
    updateAvatarSuccess: (state,action)=>{
        state.loading = false
        state.p_message = action.payload.message
    },
    updateAvatarFail: (state, action)=>{
        state.loading = false
        state.p_error = action.payload
    },




    clearError: (state)=>{
        state.p_error = null
    },
    clearMessage: (state)=>{
        state.p_message = null
    },

})