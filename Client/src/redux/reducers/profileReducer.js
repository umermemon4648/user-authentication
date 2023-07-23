import {createReducer } from '@reduxjs/toolkit'
export const profileReducer = createReducer({},{
    updateProfileRequest: (state)=>{
        state.loading = true
    },
    updateProfileSuccess: (state,action)=>{
        state.loading = false
        state.message = action.payload.message
    },
    updateProfileFail: (state, action)=>{
        state.loading = false
        state.error = action.payload
    },


    changePasswordRequest: (state)=>{
        state.loading = true
        state.isUpdated = false
    },
    changePasswordSuccess: (state,action)=>{
        state.loading = false
        state.isUpdated = true
        state.message = action.payload.message
    },
    changePasswordFail: (state, action)=>{
        state.isUpdated = false
        state.loading = false
        state.error = action.payload
    },





    updateAvatarRequest: (state)=>{
        state.loading = true
    },
    updateAvatarSuccess: (state,action)=>{
        state.loading = false
        state.message = action.payload.message
    },
    updateAvatarFail: (state, action)=>{
        state.loading = false
        state.error = action.payload
    },




    clearError: (state)=>{
        state.error = null
    },
    clearMessage: (state)=>{
        state.message = null
    },

})