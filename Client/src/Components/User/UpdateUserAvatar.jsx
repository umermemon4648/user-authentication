import React, {useState, useEffect} from 'react'
import {
  Typography,
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import userImg from '../../images/user.png'
import {toast } from 'react-toastify';
import ToastAlert from '../../layout/ToastAlert'
import {useDispatch, useSelector} from 'react-redux'
import { changeAvatar } from '../../redux/actions/profileAction';
import { getTheUserProfile } from '../../redux/actions/userAction';


const UpdateUserAvatar = ({open, handleOpen}) => {
  const {loading, isUpdated} = useSelector(state => state.profile)
  const {isAuthenticate} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState(userImg)
    const getInputData = (e)=>{
      if (avatar) {
        const file = e.target.files[0];
        if (file.size > 200 * 1024) {
          // Discard avatar if it's larger than 1 MB
          toast.info("Avatar size is too large. Maximum size is 200 KB.");
          e.target.value = null; // Clear input value
          setAvatar(null); // Remove avatar
          return
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatar(reader.result);
            }
          };
          reader.readAsDataURL(file);
        }
      } 
    }
    const submitHandler = async(e)=>{
      e.preventDefault()
      const myform =  new FormData()
    myform.set("avatar", avatar)

      dispatch(changeAvatar(myform))
      handleOpen()
      await dispatch(getTheUserProfile())
        navigate(`/user-profile`)

    }

    useEffect(() => {
      // if (isAuthenticate) {
      //   navigate(`/auth/login`)
      // }
    }, [dispatch, toast, avatar,isAuthenticate, loading])
    
  return (
    <>
    
    {/* update profile pic dialog box */}
    <ToastAlert/>
     <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <form onSubmit={submitHandler}>

          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h6" color="white">
              Want to Change Avatar?
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input onChange={getInputData} name="avatar" type="file" accept='image/*' label="New Avatar" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
          
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
    Update Avatar
  </Button>
)}



          </CardFooter>
            </form>
        </Card>
      </Dialog> 
    
    </>
  )
}

export default UpdateUserAvatar