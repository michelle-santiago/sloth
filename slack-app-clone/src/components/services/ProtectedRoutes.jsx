import React from "react";
import { Navigate} from "react-router-dom";
import Chat from "../../pages/Chat";

const ProtectedRoutes = () => {
  const auth = sessionStorage.getItem("loggedInUserAuth")
  return auth ? 
      <>  
        <Chat/>
      </>
      : <Navigate to="/login"/>
}

export default ProtectedRoutes;