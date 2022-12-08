import React, { useState, createContext } from "react";
export let UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const userAuthenticated = JSON.parse(sessionStorage.getItem("loggedInUserAuth"))
    const userChannel = JSON.parse(sessionStorage.getItem("userChannels"))
    const userID = JSON.parse(sessionStorage.getItem("userID"))
    const usersData = JSON.parse(sessionStorage.getItem("usersData"))
    const userSelectedData = JSON.parse(sessionStorage.getItem("userSelected"))
    const chatData = JSON.parse(sessionStorage.getItem("chatData"))
    const usersSelectedData = JSON.parse(localStorage.getItem("usersSelected"))
    const [ userAuth, setUserAuth ] = useState(!userAuthenticated ? {} : userAuthenticated);
    const [ userAuthHeader, setUserAuthHeader ] =  useState(!userAuthenticated ? {} : userAuthenticated);
    const [ channel, setChannel]=useState(!userChannel ? [] : userChannel)
    const [id, setId] = useState(!userID ? "" : userID);
    const [ users, setUsers]=useState(!usersData ? "" : usersData);
    const [ userSelected, setUserSelected]=useState(!userSelectedData ? {} : userSelectedData);
    const [ usersSelected, setUsersSelected]=useState(!usersSelectedData ? [] : usersSelectedData);
    const [ chat, setChat]=useState(!chatData ? [] : chatData);

    const updateUserAuthHeader = (data) => {
		sessionStorage.setItem("loggedInUserAuth", JSON.stringify(data));
		setUserAuthHeader(data);
	};

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
                users,
                setUsers,
                userSelected,
                setUserSelected,
                usersSelected,
                setUsersSelected,
                chat,
                setChat
            }}
        >
            { children }
        </UserContext.Provider>
    );
};