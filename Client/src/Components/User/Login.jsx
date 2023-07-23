import React, {useState, useEffect} from 'react'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner ,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { loginUser } from '../../redux/actions/userAction';
import ToastAlert from '../../layout/ToastAlert';
import {toast } from 'react-toastify';
import { isValidEmail } from '../../utility/reuseFunctions';


const Login = ({loading, isAuthenticate}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: '',
        password: '',
    })
    const getLoginData = (e)=>{
      console.log("login: ",login);
        const {name, value} = e.target
        setLogin({...login, [name]:value})
    }

    const submitHandler = (e)=>{
      e.preventDefault()
      const {email, password} = login
      if (!(password && email)) {
        return toast.warn("Please provide email and password")
      }
      if (!isValidEmail(email)) {
        return toast.warn("Enter a valid email")
      }


      dispatch(loginUser(email, password))
      console.log("succees in Login: ", success);
    
      // .then(()=> navigate(`/`))
    }

    useEffect(() => {
      if (isAuthenticate) {
        navigate(`/`)
      }

    }, [dispatch, isAuthenticate, loading])

  return (
    <>
    <ToastAlert/>
{loading&& <Spinner/> }

    <div className="flex items-center justify-center my-12">

<Card color="transparent" shadow={false}>
 <Typography variant="h4" color="blue-gray">
   Login
 </Typography>
 <Typography color="gray" className="mt-1 font-normal">
   Enter your details to login.
 </Typography>
 <form onSubmit={submitHandler} method='POST' className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
   <div className="mb-4 flex flex-col gap-6">
     <Input autoFocus size="lg" label="Email" onChange={getLoginData} value={login.email} name="email" />
     <Input type="password" size="lg" label="Password" onChange={getLoginData} value={login.password} name="password"/>
   </div>

         <Typography
           variant="small"
           color="gray"
           className="flex justify-end items-center font-normal"
         >
          <a href="#" className="text-end items-end  font-medium transition-colors text-blue-600 hover:text-blue-500">Forgot your password?</a>
         </Typography>
     
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
    Login
  </Button>
)}





   <Typography color="gray" className="gap-3 flex items-center mt-4 text-center font-normal">
     Not registered yet?{" "}
     <Link
       to={'/auth/signup'}
       className="flex items-center gap-1 font-medium text-blue-500 transition-colors hover:text-blue-700"
     >
       Register now
     
     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
         <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
</svg>
     </Link>
   </Typography>
 </form>
</Card>
     </div>

    </>
  )
}

export default Login