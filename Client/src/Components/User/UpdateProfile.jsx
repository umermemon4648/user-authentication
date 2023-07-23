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
} from "@material-tailwind/react";



const UpdateProfile = ({handleOpen, open}) => {

  const [updateProfile, setUpdateProfile] = useState({
    n_name: '',
    n_email: '',
})

  const getInputData = (e)=>{
    console.log("updateProfile: ",updateProfile);
      const {name, value} = e.target
      setUpdateProfile({...updateProfile, [name]:value})
  }

  const submitHandler = (e)=>{
    e.preventDefault()
    const {n_email, n_name} = updateProfile
    alert("Update profile")


    // dispatch(loginUser(email, password))
    // navigate('/')
  }

  
  return (
    <>
    
{/* update profile dialog box */}
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
              Want to Update Email or Password?
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input onChange={getInputData} value={updateProfile.n_name} name="n_name" type="name" label="New Name" size="lg" />
            <Input onChange={getInputData} value={updateProfile.n_email} name="n_email" type="email" label="New Email" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button type='submit' variant="gradient" fullWidth>
              Update Profile
            </Button>
          </CardFooter>
            </form>
        </Card>
      </Dialog>

    </>
  )
}

export default UpdateProfile