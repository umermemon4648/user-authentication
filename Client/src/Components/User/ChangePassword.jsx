import React, {useState, useEffect} from 'react'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import {toast } from 'react-toastify';
import ToastAlert from '../../layout/ToastAlert';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { changePassowrd } from '../../redux/actions/profileAction';


const ChangePassword = () => {
  const {message, error, isUpdated} = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [data, setData] = useState({
    o_password: '',
    n_password: '',
})

  const getInputData = (e)=>{
    console.log("data :",data);
    const {name, value} = e.target
    setData({...data, [name]: value})
  }

  const submitHandler = (e)=>{
    e.preventDefault()
    const {o_password, n_password} = data
    if (!(o_password && n_password)) {
      return toast.warn("Please Complete all fields")
    }
    dispatch(changePassowrd(o_password, n_password))
  }




  useEffect(() => {
      if (error) {
        toast.error(error)
        dispatch({type: 'clearError'})
      }
  
      if (message) {
        toast.success(message)
        dispatch({type: 'clearMessage'})
      }
      if (isUpdated) {
        navigate('/user-profile');
      }
 
    }, [dispatch, error, message, isUpdated])


    // if (loading) {
    //   navigate('/user-profile')
      
    // }

  return (
    <>
<ToastAlert/>
        <div className="flex items-center justify-center my-12">

<Card color="transparent" shadow={false}>
 <Typography variant="h4" color="blue-gray">
   Change Password
 </Typography>
 
 <form onSubmit={submitHandler} method='PUT' className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
   <div className="mb-4 flex flex-col gap-6">
     <Input type="password" size="lg" label="Old Password" onChange={getInputData} value={data.o_password} name="o_password"/>
     <Input type="password" size="lg" label="New Password" onChange={getInputData} value={data.n_password} name="n_password"/>
   </div>

    
   <Button className="mt-6" fullWidth type='submit'>
   <span className="absolute inset-y-0 left-0 flex items-center pl-3">
         
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg> 
         </span>
     Update
   </Button>
 
 </form>
</Card>
     </div>
    </>
  )
}

export default ChangePassword