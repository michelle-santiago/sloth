import {useState, createContext, useContext, useEffect } from "react";

const useUserApi=()=>{
    const userAuthenticated=JSON.parse(sessionStorage.getItem("loggedInUserAuth"))
    const [userAuth, setUserAuth] =  useState(!userAuthenticated ? {} : userAuthenticated);

    console.log("User check",userAuth)
    return { userAuth, setUserAuth }
};

export const UserApiContext=createContext(null);
export const useUserApiContext = () => useContext(UserApiContext);
export default useUserApi