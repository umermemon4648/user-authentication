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


const UpdateUserAvatar = ({open, handleOpen}) => {
    const getInputData = ()=>{}
    const submitHandler = ()=>{}
  return (
    <>
    
    {/* update profile pic dialog box */}
    
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
            <Input onChange={getInputData} name="u_avatar" type="file" accept='image/*' label="New Avatar" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button type='submit' variant="gradient" fullWidth>
              Update Avatar
            </Button>
          </CardFooter>
            </form>
        </Card>
      </Dialog> 
    
    </>
  )
}

export default UpdateUserAvatar