import {useState, createContext, useContext, useEffect } from "react";

const useProfile=()=>{
    const [user, setUser] = useState('');
    const loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"))
       
    useEffect(() => {
    if (loggedInUser) {
        setUser(loggedInUser)            
    }
    }, []);
    console.log("User check",user)
    return {user, setUser}
};

export const ProfileContext=createContext(null);
export const useProfileContext = () => useContext(ProfileContext);
export default useProfile 