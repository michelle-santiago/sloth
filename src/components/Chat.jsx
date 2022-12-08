import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/UserContext";
import { retrieveDirectMsg} from "../api/api";
const Chat = () => {
	const { userAuthHeader, userSelected, chat, setChat } = useContext(UserContext);
	console.log("chat", chat)
	//console.log("User check: ", userAuthHeader.uid);
	//console.log("who receiver",userSelected)
	/*useEffect(()=>{
        retrieveDirectMsg(userAuthHeader,userSelected.id,userSelected.chatType)
        .then((res) => {
           console.log("RESPONSE MSG:",res.data)
		   setChat(res.data)
        })
        .catch((err) => {
            toast.error(err.response.data.errors[0])
        });
    },[])*/

	return (
		<>
			{/* Chat content */}
			<div className="flex-1 flex flex-col bg-white overflow-hidden">
				{/* Channel/User */}
				<div className="border-b flex px-6 py-2 items-center flex-none">
					<div className="flex flex-col">
						<h3 className="text-grey-darkest mb-1 font-extrabold">{userSelected.uid}</h3>
						<div className="text-grey-dark text-sm truncate">Lorem impsum</div>
					</div>
				</div>
				{/* Chat messages */}
				<div className="px-6 py-4 flex-1 overflow-y-scroll">
					{chat.map((message,index)=>{
					return(
						<div key={index}>
							<div className="flex items-start mb-4 text-sm">
								<div className="avatar placeholder px-2">
									<div className="bg-white-focus border  bg-base-300 text-neutral-content rounded-xl w-10 h-10">
										<span className="text-primary">{message.sender.uid.toUpperCase().charAt(0)}</span>
									</div>
								</div> 
								<div className="flex-1 overflow-hidden">
									<div className="flex flex-row gap-2">
										<span className="font-bold">{message.sender.uid}</span>
										<span className="text-grey text-xs">{message.created_at}</span>
									</div>
									<p className="text-black leading-normal">{message.body}</p>
								</div>
							</div>
						</div>
					)
					})}

					<div className="pb-6 px-4 flex-none">
						<div className="flex rounded-lg border-2 border-grey overflow-hidden">
							
							<input type="text" className="w-full px-4" placeholder="Message" />
							<span className="text-3xl text-grey border-l-2 border-grey p-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  								<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
							</svg>

							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;
