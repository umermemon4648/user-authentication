import React, {useState, useEffect} from 'react'
import {toast } from 'react-toastify';
import ToastAlert from '../../layout/ToastAlert'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import userImg from '../../images/user.png'
import {useDispatch} from 'react-redux'
import { registerTheUser } from '../../redux/actions/userAction';
import { isValidEmail } from '../../utility/reuseFunctions';
import { Helmet } from 'react-helmet';



const SignUp = ({loading, isAuthenticate}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
    // check: false,
  })
  const [avatar, setAvatar] = useState()
  const [previewAvatar, setPreviewAvatar] = useState(userImg)


  const getSignUpData = (e) => {
   
    const { name, value } = e.target;
    console.log("signUp = ",signUp);
    if (name === "avatar") {
      const file = e.target.files[0];
      if (file.size > 200 * 1024) {
        // Discard avatar if it's larger than 1 MB
        toast.info("Avatar size is too large. Maximum size is 200 KB.");
        e.target.value = null; // Clear input value
        setPreviewAvatar(null); // Remove preview image
        setAvatar(null); // Remove avatar
        return
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreviewAvatar(reader.result);
            setAvatar(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      setSignUp({ ...signUp, [name]: value });
    }
  };
  

  const submitHandler = (e)=>{
    e.preventDefault()
    const {name, email, password} = signUp
    const myform =  new FormData()
    // myform.set("name", name)
    // myform.set("email", email)
    // myform.set("password", password)
    // myform.set("avatar", avatar)

    if (!(name && password && email)) {
      return toast.warn("Please Complete all fields")
    }
    if (!isValidEmail(email)) {
      return toast.warn("Enter a valid email")
    }
    dispatch(registerTheUser(name, email, password))
    
  }

useEffect(() => {
  if (isAuthenticate) {
    navigate(`/auth/login`)
  }
}, [dispatch, signUp, avatar, previewAvatar])



  return (
    <>
    <Helmet>
<title>SignUp</title>
</Helmet>

    <ToastAlert/>

    <div className="flex items-center justify-center my-12">

     <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form onSubmit={submitHandler} method="POST" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input autoFocus  size="lg" label="Name" onChange={getSignUpData} value={signUp.name} name="name" />
          <Input size="lg" label="Email" onChange={getSignUpData} value={signUp.email} name="email" />
          <Input type="password" size="lg" label="Password" onChange={getSignUpData} value={signUp.password} name="password" />
          <div className='flex justify-center items-center'>
            <div className=''>
          <img src={previewAvatar} width={30} height ={5} alt="" srcSet="" />
            </div>
          <Input onChange={getSignUpData}  type="file" size="lg" name='avatar' accept='image/*'/>
          </div>
          
        </div>
        <Checkbox
          label={
            (
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-blue-500"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            )
          }
          containerProps={{ className: "-ml-2.5" }}
        />

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
    Register
  </Button>
)}


        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link
            to={'/auth/login'}
            className="font-medium text-blue-500 transition-colors hover:text-blue-700">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
          </div>
    
    </>
  )
}

export default SignUp