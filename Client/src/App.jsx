import React, {useEffect} from 'react';
import {toast } from 'react-toastify';
import ToastAlert from './layout/ToastAlert';
import {useDispatch, useSelector} from 'react-redux'


import ProtectedRoute from './routes/ProtectedRoute';
import { NavbarUI, FooterUI, Hero } from './Components/Home';
import { SignUp, Login, UserProfile, ChangePassword} from './Components/User';



import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { getTheUserProfile } from './redux/actions/userAction';

export default function App() {
  const dispatch = useDispatch()
  const {isAuthenticate ,user , message, error, loading} = useSelector(state => state.user)
  // const {message, error} = useSelector(state => state.profile)




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
   dispatch(getTheUserProfile())
  }, [dispatch])
  

  return (
<>
<ToastAlert/>
<Router>

<NavbarUI/>

  <Routes>

  {/* Protected Routes */}
      <Route exact path="/" element={<Hero/>}/>
      <Route  exact path="/auth/login" element={<Login loading={loading} isAuthenticate = {isAuthenticate} />}/>
      <Route exact path="/auth/signup" element={<SignUp loading={loading} isAuthenticate = {isAuthenticate}/>}/>

     
  <Route element={<ProtectedRoute isAuthenticate={isAuthenticate} />}>
      <Route exact path="/user-profile" element={<UserProfile/>}/>
      <Route exact path="/change-password" element={<ChangePassword/>}/>
  </Route>





  </Routes>

<FooterUI/>

</Router>



</>

  );
}
