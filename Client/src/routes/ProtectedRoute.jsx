import React from 'react'
import { Outlet,Navigate} from "react-router-dom";

const ProtectedRoute = ({isAuthenticate}) => {
    if (!isAuthenticate) {
        return <Navigate to={'/auth/login'} />
    }

  return (
    <Outlet/>
  )
}

export default ProtectedRoute