import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import ProfileMenu from '../Navbar/ProfileMenu';
import NavList from '../Navbar/NavList';

import {
  Navbar,
  Collapse ,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  Bars2Icon,
} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';


const NavbarUI = () => {
  const {isAuthenticate ,user} = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, [isAuthenticate]);

  return (
    <>

{/* style={{background: "red", width: "10000vw"!important}} */}
<Navbar  className="myImportantWidth block w-full max-w-screen">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Link to={'/'}>
        <Typography
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          >
          AuthSecure
        </Typography>
          </Link>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          
          {isAuthenticate? (<></>):(<NavList/>)  }
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        
        {isAuthenticate && <ProfileMenu />}
        


      </div>
      <Collapse  open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse >
    </Navbar>
    
    </>
  )
}

export default NavbarUI