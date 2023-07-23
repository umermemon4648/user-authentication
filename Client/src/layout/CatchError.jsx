import React, {useEffect} from 'react'
import {toast } from 'react-toastify';
import ToastAlert from './ToastAlert';
import {useDispatch, useSelector} from 'react-redux'




const CatchError = () => {
    const dispatch = useDispatch()
    const {message, error} = useSelector(state => state.profile)



    useEffect(() => {
        if (error) {
          toast.error(error)
          dispatch({type: 'clearError'})
        }
    
        if (message) {
          toast.success(message)
          dispatch({type: 'clearMessage'})
        }
      }, [dispatch, error, message])

  return (
    <>
    <ToastAlert/>
    
    </>
  )
}

export default CatchError