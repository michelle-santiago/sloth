import React, { useState, createContext } from "react";
export let UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const userAuthenticated = JSON.parse(sessionStorage.getItem("loggedInUserAuth"))
    const userChannel = JSON.parse(sessionStorage.getItem("userChannels"))
    const userID = JSON.parse(sessionStorage.getItem("userID"))
    const [ userAuth, setUserAuth ] = useState(!userAuthenticated ? {} : userAuthenticated);
    const [ userAuthHeader, setUserAuthHeader ] =  useState(!userAuthenticated ? {} : userAuthenticated);
    const [ channel, setChannel]=useState(!userChannel ? [] : userChannel)
    const [id, setId] = useState(!userID ? "" : userID);
    const [ chat, setChat]=useState("")

    const updateUserAuthHeader = (info) => {
		sessionStorage.setItem("loggedInUserAuth", JSON.stringify(info));
		setUserAuthHeader(info);
	};

   

    console.log("User check",userAuthHeader)
    return (
        <UserContext.Provider
            value={{
                userAuth,
                setUserAuth,
                userAuthHeader,
                setUserAuthHeader,
                updateUserAuthHeader,
                id,
                setId,
                channel,
                setChannel,
                chat,
                setChat
            }}
        >
            { children }
        </UserContext.Provider>
    );
};