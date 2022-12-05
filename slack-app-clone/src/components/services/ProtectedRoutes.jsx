import React from "react";
import { Outlet, Navigate, NavLink } from "react-router-dom";
import  useProfile,{ ProfileContext} from '../../hooks/useProfile';

const ProtectedRoutes = () => {
  const {user, setUser} = useProfile();
  const auth = localStorage.getItem("loggedInUser")

  return auth ? 
      <>  
          <ProfileContext.Provider value={{ user, setUser }}>
            <NavLink  to="/chat"  className="">Chat</NavLink>
            <div className="flex flex-row">
                <div className='p-4'>
                    <Outlet />
                </div> 
            </div>
          </ProfileContext.Provider>
      </>
      : <Navigate to="/login"/>
}

export default ProtectedRoutes;