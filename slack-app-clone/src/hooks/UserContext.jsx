import React, { useState, createContext } from "react";
export let UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const userAuthenticated = JSON.parse(sessionStorage.getItem("loggedInUserAuth"))
    const [ userAuth, setUserAuth ] = useState(!userAuthenticated ? {} : userAuthenticated);
    const [ userAuthHeader, setUserAuthHeader ] =  useState(!userAuthenticated ? {} : userAuthenticated);

    const updateUserAuthHeader = (info) => {
		sessionStorage.setItem("loggedInUserAuth", JSON.stringify(info));
		setUserAuthHeader(info);
	};

    const [id, setId] = useState("");

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
                setId
            }}
        >
            { children }
        </UserContext.Provider>
    );
};