import React, { useContext, useEffect } from "react";
import { UserContext } from "../hooks/UserContext";
import AddChannel from "./common/AddChanel";
import { retrieveChannels, retrieveMsg } from "../api/api";
const Sidebar = () => {
	const { userAuthHeader, channel, setChannel, setChatType, setChannelSelected, setChat, usersSelected, setUserSelected, setUsersSelected } = useContext(UserContext);
    const user=userAuthHeader;
	//console.log("User check side: ", user.uid);
    //console.log("channel: ",channel)
	//console.log("selected users:", usersSelected)
    useEffect(()=>{
        retrieveChannels(user)
        .then((res) => {
           //console.log("response:",res.data)
           sessionStorage.setItem("userChannels", JSON.stringify(res.data));
           setChannel(res.data)
        })
        .catch((err) => {
            toast.error(err.response.data.errors[0])
        });
       
    },[])
	
	const handleSelectedChannel=(channel)=>{
		setChatType("Channel")
		sessionStorage.setItem("chatTypeData", JSON.stringify("Channel"));
		console.log(channel)
		//console.log("channel id",channel.id)
		sessionStorage.setItem("channelSelected", JSON.stringify(channel));
		setChannelSelected(channel)
		
		retrieveMsg(userAuthHeader,channel.id,"Channel")
		.then((res) => {
		  //console.log("RESPONSE MSG:",res.data)
		  setChat(res.data)
		  sessionStorage.setItem("chatData", JSON.stringify(res.data));
		})
		.catch((err) => {
			console.log(err[0])
		});
	  }
	  const handleSelectedUser=(user)=>{
		setChatType("User")
		sessionStorage.setItem("chatTypeData", JSON.stringify("User"));
		//console.log("receiver id",user.id)
		//console.log("receiver email",user.uid)
		setUserSelected(user)
		sessionStorage.setItem("userSelected", JSON.stringify(user));
	
		retrieveMsg(userAuthHeader,user.id,"User")
		.then((res) => {
		  //console.log("RESPONSE MSG:",res.data)
		  setChat(res.data)
		  sessionStorage.setItem("chatData", JSON.stringify(res.data));
		})
		.catch((err) => {
			console.log(err[0])
		});
	  }
	  const handleDeleteSelectedUser=(userData)=>{
		setChatType("")
		setChat([])
		const filteredUsers=usersSelected.filter((user)=>{
            return user.id !== userData.id
        })
		console.log("filtered",filteredUsers)
        setUsersSelected(filteredUsers);
        sessionStorage.setItem("usersSelected", JSON.stringify(filteredUsers));
		
	  }
	return (
		<div className="bg-primary flex-none w-64 pb-6">
			<div className=" mb-2 px-4 flex justify-between border-b border-t border-accent pt-2 pb-2">
				<div className="flex-auto text-white">
					<h1 className="font-semibold text-xl leading-tight mb-1 truncate">Avion School</h1>
				</div>
				<div className="cursor-pointer bg-white text-primary rounded-full avatar p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
				</div>
			</div>
			<div className="mb-8">
				<div className="px-4 mb-2 text-white flex justify-between items-center">
					<div className="opacity-75">Channels</div>
					<label htmlFor="add-channel" className="cursor-pointer">
						<svg
							className="fill-current h-4 w-4 opacity-50"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
						</svg>
					</label>
				</div>
				<div className="h-50 overflow-y-scroll mr-1">
					<ul>
						{channel.length!==0&&channel.map((channel,index) => {
							return (
								<li key={index} className="cursor-pointer hover:bg-secondary" onClick={()=>{ handleSelectedChannel(channel)}}>
									<div className="flex flex-row">
										<div className="px-4 py-1 text-white opacity-75">
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
												<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
											</svg>
										</div>
										<div className="bg-teal-dark py-1 text-white opacity-75"
										 	>
											{channel.name}
											</div>
									</div>
								</li>
							)
						})}
					</ul>
				 </div>				
			</div>
			<div className="mb-8">
				<div className="px-4 mb-2 text-white flex justify-between items-center">
					<div className="opacity-75">Direct Messages</div>
				</div>
				<div className="h-50 overflow-y-scroll mr-1">
					<ul>
						{usersSelected.length!==0&&usersSelected.map((user,index) => {
							return (
								<li key={index} className="cursor-pointer hover:bg-secondary">
									<div className="flex flex-row">
										<div className="px-4 py-1 text-white opacity-75" onClick={()=>{ handleSelectedUser(user)}}>
											<div className="avatar placeholder">
												<div className="bg-white-focus border  bg-base-300 text-neutral-content rounded w-5 h-5">
													<span className="text-primary text-xs">{user.uid.toUpperCase().charAt(0)}</span>
												</div>
											</div> 
										</div>
										<div className="bg-teal-dark py-1 text-white opacity-75 w-[65%]" >
											<div className="flex flex-row gap-2">
												<span className="truncate" onClick={()=>{ handleSelectedUser(user)}} >{user.uid}</span>	
												<div className="bg-secondary hover:bg-base-300"  onClick={()=>{ handleDeleteSelectedUser(user)}}>
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
														<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
													</svg>
												</div>
											</div>
										</div>
										
									</div>
								</li>
							)
						})}
					</ul>
				 </div>	
			</div>
		
			<AddChannel />
		</div>
	);
};

export default Sidebar;
