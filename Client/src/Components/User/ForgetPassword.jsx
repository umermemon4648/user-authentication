import React, {useState, useEffect} from 'react'
import {
  Card,
  Input,
  Button,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import {toast } from 'react-toastify';
import ToastAlert from '../../layout/ToastAlert';
import { Navigate, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
// import {  } from '../../redux/actions/profileAction';
import { Helmet } from 'react-helmet';
import { isValidEmail } from '../../utility/reuseFunctions';
import { forgetThePassword } from '../../redux/actions/profileAction';


const ForgetPassword = () => {
  const {loading, isUpdated} = useSelector(state => state.profile)
  const {isAuthenticate} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')


  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };


const submitHandler = (e)=>{
  e.preventDefault()
  if (!email) {
    return toast.warn("Please Complete the field")
  }
  if (!isValidEmail(email)) {
    return toast.warn("Enter a valid email")
  }
  dispatch(forgetThePassword(email))
}


useEffect(() => {
  // if (p_error) {
  //   toast.error(p_error)
  //   dispatch({type: 'clearError1'})
  // }

  // if (p_message) {
  //   toast.success(p_message)
  //   dispatch({type: 'clearMessage1'})
  // }

  // if (isUpdated) {
  //     navigate('/reset-password');
  //   }

  }, [dispatch, isUpdated, loading, isAuthenticate])



  return (
    <>

<Helmet>
<title>Forget Password</title>
</Helmet>
<ToastAlert/>

{isAuthenticate ? (
<>

<Navigate to="/user-profile" replace={true} />
</>)
:(
<>
<div className="flex items-center justify-center my-12">

<Card color="transparent" shadow={false}>
 <Typography variant="h4" color="blue-gray">
   Forget Password
 </Typography>
 
 <form onSubmit={submitHandler} method='POST' className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
   <div className="mb-4 flex flex-col gap-6">
     <Input autoFocus type="text" size="lg" label="example@gmail.com" onChange={handleInputChange} value={email} />
      </div>

    
  
   {loading ? (
  <Button className="mt-6 flex opacity-10 cursor-not-allowed" fullWidth type='submit'>
    <Spinner className='flex mx-auto items-center justify-center' />
  </Button>
) : (
  <Button className="mt-6" fullWidth type='submit'>
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
    </span>
    Send Reset Link
  </Button>
)}


 
 </form>
</Card>
     </div>
</>
)}



    </>
  )
}

export default ForgetPassword