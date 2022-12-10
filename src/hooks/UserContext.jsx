import React, { useState, createContext, useEffect } from "react";
export let UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const userAuthenticated = JSON.parse(sessionStorage.getItem("loggedInUserAuth"))
    const userChannel = JSON.parse(sessionStorage.getItem("userChannels"))
    const channelSelectedData = JSON.parse(sessionStorage.getItem("channelSelected"))
    const channelDetailsData = JSON.parse(sessionStorage.getItem("channelDetails"))
    const userID = JSON.parse(sessionStorage.getItem("userID"))
    const usersData = JSON.parse(sessionStorage.getItem("usersData"))
    const userSelectedData = JSON.parse(sessionStorage.getItem("userSelected"))
    const usersSelectedData = JSON.parse(sessionStorage.getItem("usersSelected"))
    const chatTypeData = JSON.parse(sessionStorage.getItem("chatTypeData"))
    const chatData = JSON.parse(sessionStorage.getItem("chatData"))
    const [ userAuthHeader, setUserAuthHeader ] =  useState(!userAuthenticated ? {} : userAuthenticated);
    const [ channel, setChannel]=useState(!userChannel ? [] : userChannel)
    const [ channelSelected, setChannelSelected]=useState(!channelSelectedData ? {} : channelSelectedData)
    const [ channelDetails, setChannelDetails]=useState(!channelDetailsData ? [] : channelDetailsData)
    const [id, setId] = useState(!userID ? "" : userID);
    const [ users, setUsers]=useState(!usersData ? "" : usersData);
    const [ userSelected, setUserSelected]=useState(!userSelectedData ? {} : userSelectedData);
    const [ usersSelected, setUsersSelected]=useState(!usersSelectedData ? [] : usersSelectedData);
    const [ chatType, setChatType]=useState(!chatTypeData ? "" : chatTypeData);
    const [ chat, setChat]=useState(!chatData ? [] : chatData);

    const updateUserAuthHeader = (data) => {
		sessionStorage.setItem("loggedInUserAuth", JSON.stringify(data));
		setUserAuthHeader(data);
	};
    
    return (
        <UserContext.Provider
            value={{
                userAuthHeader,
                setUserAuthHeader,
                updateUserAuthHeader,
                id,
                setId,
                channel,
                setChannel,
                channelSelected,
                setChannelSelected,
                channelDetails,
                setChannelDetails,
                users,
                setUsers,
                userSelected,
                setUserSelected,
                usersSelected,
                setUsersSelected,
                chatType,
                setChatType,
                chat,
                setChat
            }}
        >
            { children }
        </UserContext.Provider>
    );
};