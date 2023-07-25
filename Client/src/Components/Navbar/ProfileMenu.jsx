import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
  } from "@material-tailwind/react";
  import {
    UserCircleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    PowerIcon,
  } from "@heroicons/react/24/outline";
import { logoutTheUser } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import userImg from '../../images/user.png'


  const ProfileMenu = () => {
    const {isAuthenticate ,user, loading} = useSelector(state => state.user)
    const navigate = useNavigate()
  const dispatch = useDispatch()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
   

      // profile menu component
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      onClick: () => handleProfileClick(),
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      onClick: () => handleSignOutClick(),
      
    },
  ];

  const handleSignOutClick = () => {
    // Implement the logic when "Sign Out" is clicked
    dispatch(logoutTheUser())
    navigate('/')
  };

  const handleProfileClick = ()=>{
    navigate('/user-profile')
  }

  useEffect(() => {
  }, [dispatch, user])
  
  

  return (
    <>


    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
         

  <Avatar
  variant="circular"
  size="sm"
  alt="user.avatar.url"
  className="border border-blue-500 p-0.5"
  src={user.avatar.url}
/>

    



          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, onClick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={onClick}
              // onClick={onClick}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              

              {React.createElement(icon,{
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
    </>
  )
}

export default ProfileMenu