import React, {useState, useEffect} from 'react'
import {
    Typography,
    MenuItem,

  } from "@material-tailwind/react";
  import {
    CubeTransparentIcon,
    UserCircleIcon,
    CodeBracketSquareIcon,
  
  } from "@heroicons/react/24/outline";

  const navListItems = [
    {
      label: "SignUp",
      icon: UserCircleIcon,
      url: '/auth/signup',
    },

    {
      label: "Login",
      icon: CodeBracketSquareIcon,
      url: '/auth/login',
    },
  ];

import { Link } from 'react-router-dom';


const NavList = () => {
  return (
    <>
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
     
      {navListItems.map(({ label, icon,url }, key) => (
        <>
        <Link to={url}>
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
          </Link>
          </>

      ))}
    </ul>
    </>
  )
}

export default NavList