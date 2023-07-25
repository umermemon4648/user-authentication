import React, {useEffect} from 'react';
import {toast } from 'react-toastify';
import ToastAlert from './layout/ToastAlert';
import {useDispatch, useSelector} from 'react-redux'


import ProtectedRoute from './routes/ProtectedRoute';
import { NavbarUI, FooterUI, Hero, ErrorPage, Hero1 } from './Components/Home';
import { SignUp, Login, UserProfile, ChangePassword, ForgetPassword, PasswordRecovery} from './Components/User';



import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import { getTheUserProfile } from './redux/actions/userAction';
// import Loader from './layout/Loader';



export default function App() {
  const dispatch = useDispatch()
  const {isAuthenticate ,user , message, error, loading} = useSelector(state => state.user)
  const {p_message, p_error} = useSelector(state => state.profile)




  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({type: 'clearError'})
    }

    if (message) {
      toast.success(message)
      dispatch({type: 'clearMessage'})
    }
  }, [dispatch, error, message])
  

  useEffect(() => {
    if (p_error) {
      toast.error(p_error)
      dispatch({type: 'clearError'})
    }

    if (p_message) {
      toast.success(p_message)
      dispatch({type: 'clearMessage'})
    }
  }, [dispatch, p_error, p_message])


  useEffect(() => {
   dispatch(getTheUserProfile())
  }, [dispatch, isAuthenticate])
  

  return (
    <>
<ToastAlert/>
<Router>
  <NavbarUI/>

{/* {loading===true ? (<Loader/>): (<> */}
  <Routes>

{/* <Route exact path="/" element={<Hero/>}/> */}
<Route exact path="/" element={<Hero1/>}/>
<Route  exact path="/auth/login" element={<Login loading={loading} isAuthenticate = {isAuthenticate} />}/>
<Route exact path="/auth/signup" element={<SignUp loading={loading} isAuthenticate = {isAuthenticate}/>}/>

<Route exact path="/forget-password" element={<ForgetPassword/>}/>
<Route exact path="/reset-password/:resetToken" element={<PasswordRecovery/>}/>






{/* Protected Routes */}
<Route element={<ProtectedRoute isAuthenticate={isAuthenticate} />}>
<Route exact path="/user-profile" element={<UserProfile/>}/>
<Route exact path="/change-password" element={<ChangePassword/>}/>
</Route>

{/* <Route element={<ProtectedRoute isAuthenticate={!isAuthenticate} />}>
</Route> */}


<Route  exact path ="*" element = {  <ErrorPage /> } />

</Routes>


{/* </>)} */}

  



<FooterUI/>
</Router>



</>

  );
}
