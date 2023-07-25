import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {Link, useNavigate  } from "react-router-dom";
import userImg from '../../images/user.png'
import UpdateProfile from './UpdateProfile';
import UpdateUserAvatar from './UpdateUserAvatar';
import { Helmet } from 'react-helmet';
import {
    Typography,
    Button,
  } from "@material-tailwind/react";
import { getTheUserProfile } from '../../redux/actions/userAction';
import Loader from '../../layout/Loader'


const UserProfile = () => {
  const {isAuthenticate, user, loading} = useSelector((state)=> state.user)
  const { isUpdated} = useSelector(state => state.profile)
  const dispatch = useDispatch()


    // update profile dialog box
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    // update profile pic dialog box
    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => setOpen1((cur) => !cur);




    useEffect(() => {
    dispatch(getTheUserProfile())
    }, [isAuthenticate, dispatch, isUpdated])
    
  return (
    <>

<Helmet>
<title>User Profile</title>
</Helmet>

{loading ? (<Loader/>)
: 
(<>


<div className="profile-main-div flex md:flex-row flex-col my-9 md:mx-12 mx-auto h-full justify-center md:justify-start items-center md:items-start">

<div className="  flex flex-col 1-col-profile mx-16 md:w-1/2 w-full  justify-center items-center ">
  <div className="user-avatar md:h-64 md:w-64 h-48 w-48 rounded-full border border-gray-200 mb-7">
    {/* <img className='h-full w-full object-cover object-center' src={user.avatar.url} alt="" /> */}
    {user.avatar?.url ? (
  <img className='h-full w-full object-cover object-center' src={user.avatar.url} alt="user.avatar.url" />
) : (
  <img className='h-full w-full object-cover object-center' src={userImg} alt="userImg" />
)}

  </div>

  <div className='text-center'> 
  <Button onClick={handleOpen1} ripple={true}>Change Photo</Button> </div>
</div>

{/* items-center md:items-start */}
<div className="2-col-profile space-y-7 text-base md:text-lg md:w-1/2 w-full mt-7 md:mt-auto justify-center md:justify-start  flex flex-col items-center md:items-start text-center md:text-start">

<div className="name">
<Typography>Full Name</Typography>
<p className='text-gray-600'>{user.name}</p>
</div>

<div className="email">
<Typography>Email</Typography>
<p className='text-gray-600'>{user.email}</p>
</div>

<div className="date">
<Typography>Joined on</Typography>
<p className='text-gray-600'>{String(user.createdAt).substr(0,10)}</p>
</div>

<div className=''> 
    
 <Button onClick={handleOpen} ripple={true}>Update Profile</Button> 
    </div>

    <div className=''>
        <Link to={'/change-password'}>
    <Button ripple={true}>Change Password</Button>
    </Link> 
     </div>


</div>
</div>

 

<UpdateProfile handleOpen={handleOpen} open={open} />
<UpdateUserAvatar handleOpen={handleOpen1} open={open1} />


</>)
}










    </>
  )
}

export default UserProfile