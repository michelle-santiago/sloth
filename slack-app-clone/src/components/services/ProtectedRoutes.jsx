import React, {useState} from "react";
import { Outlet, Navigate, NavLink } from "react-router-dom";
import  useProfile,{ ProfileContext} from '../../hooks/useProfile';
import Chat from "../../pages/Chat";

const ProtectedRoutes = () => {
  const {user, setUser} = useProfile();
  const auth = localStorage.getItem("loggedInUser")
  return auth ? 
      <>  
          <ProfileContext.Provider value={{ user, setUser }}>
            <Chat/>
          </ProfileContext.Provider>

      </>
      : <Navigate to="/login"/>
}

export default ProtectedRoutes;