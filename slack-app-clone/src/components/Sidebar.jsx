import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/UserContext";
import AddChannel from "./common/AddChanel";
import { retrieveChannels, retrieveDirectMsg } from "../api/api";
const Sidebar = () => {
	const { userAuthHeader, channel, setChannel, chat, setChat,id } = useContext(UserContext);
    const user=userAuthHeader;
	console.log("User check side: ", user.uid);
    console.log("channel: ",channel)
    useEffect(()=>{
        retrieveChannels(user)
        .then((res) => {
           console.log("response:",res.data)
           sessionStorage.setItem("userChannels", JSON.stringify(res.data));
           setChannel(res.data)
        })
        .catch((err) => {
            toast.error(err.response.data.errors[0])
        });
        
        retrieveDirectMsg(user,id,"User")
        .then((res) => {
           console.log("response msg:",res.data)
        })
        .then((data) => {
            console.log("message data",data)
          })  
        .catch((err) => {
            toast.error(err.response.data.errors[0])
        });
       
    },[])
	return (
		<div className="bg-primary flex-none w-64 pb-6">
			<div className=" mb-2 px-4 flex justify-between border-b border-t border-accent pt-2 pb-2">
				<div className="flex-auto text-white">
					<h1 className="font-semibold text-xl leading-tight mb-1 truncate">Avion School</h1>
				</div>
				<div className="cursor-pointer bg-white rounded-full avatar p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
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
                {channel.length!==0&&channel.map((channel) => {
                    return (
                        <>
                            <div className="flex flex-row">
                                <div className="px-4 py-1 text-white opacity-75">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                </div>
                                <div className="bg-teal-dark py-1 text-white opacity-75  ">{channel.name}</div>
                            </div>
                        </>
                    )
                 })}				
			</div>
			<div className="mb-8">
				<div className="px-4 mb-2 text-white flex justify-between items-center">
					<div className="opacity-75">Direct Messages</div>
				</div>
				<div className="flex items-center mb-3 px-4">
					<svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20">
						<circle cx="10" cy="10" r="10" />
					</svg>
					<span className="text-white opacity-75">
						{user.uid}
						<span className="text-grey text-sm">(you)</span>
					</span>
				</div>
				<div className="flex items-center mb-3 px-4">
					<svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20">
						<circle cx="10" cy="10" r="10" />
					</svg>
					<span className="text-white opacity-75">test@email.com</span>
				</div>
			</div>

			<AddChannel />
		</div>
	);
};

export default Sidebar;
