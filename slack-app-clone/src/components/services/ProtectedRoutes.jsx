import React, {useState} from "react";
import { Outlet, Navigate, NavLink } from "react-router-dom";
import  useProfile,{ ProfileContext} from '../../hooks/useProfile';
import Dialog from "../common/Dialog";
import { useNavigate } from "react-router-dom";
const ProtectedRoutes = () => {
  const {user, setUser} = useProfile();
  const auth = localStorage.getItem("loggedInUser")
  const navigate=useNavigate();

  const [dialogue, setDialogue] = useState({
    message: "",
    isLoading: false,
  });
  const handleDialog = (message, isLoading) => {
    setDialogue({ message, isLoading });
  };
const logoutConfirmation = (confirm) => {
    if (confirm) {
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    } else {
      handleDialog("", false);
    }
  };

  const handleLogout = () => {
    handleDialog("Are you sure you want to logout?", true);
  };
  return auth ? 
      <>  
          <ProfileContext.Provider value={{ user, setUser }}>
            {/*Put into side bar later */}
            <NavLink  to="/chat"  className="">Chat</NavLink>
            <button id="modal-logout" className="logout" onClick={handleLogout} title="Log Out">
                    Logout
            </button>
            {dialogue.isLoading && (
              <Dialog onDialog={logoutConfirmation} message={dialogue.message} />
            )}       
             {/*Put into side bar later */}
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