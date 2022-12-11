import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../hooks/UserContext";
import ChatGroupByDate from "./chat/ChatGroupByDate";
import dateFormat from "./helper/dateFormat";
import { sendMessage, retrieveMsg } from "../api/api";
import toast, { Toaster } from 'react-hot-toast';
import ChannelDetails from "./channel/ChannelDetails"
import getUid from "./helper/getUid";
const Chat = () => {
	const { userAuthHeader, users, userSelected, channelSelected,channelDetails, chatType, chat, setChat  } = useContext(UserContext);
	const [messageBody, setMessageBody]=useState("")
	const messagesEndRef = useRef(null)
	const [scroll, setScroll]=useState(null)

	//setting date with today and yesterday
	const today= new Date();
	const yesterday= new Date(today);
	yesterday.setDate(yesterday.getDate() - 1)
    const dateToday=dateFormat(today);
	const dateYesterday=dateFormat(yesterday);

	//setting receiver id for msgs
	let message_id;
	if(chatType==="User"){
		message_id=userSelected.id
	}
	if(chatType==="Channel"){
		message_id=channelSelected.id
	}

	//group messages by date
	const dates=[];
	const addDay=((date)=>{
		let found=false;
		if(dates.length!==0){
		  dates.forEach(dateData => {
			if(dateData===date){
			  found=true;
			}
		  });
		}
	
		if(found===false){
		  dates.push(date)
		}
	})

	chat.forEach((message)=>{
		//console.log("created at: ",message.created_at)
		addDay(dateFormat(message.created_at))
	})
	//for scrolling chat to bottom
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}
	
	useEffect(() => {
		scrollToBottom()
	}, [chat, scroll]);

	//sending message
	const handleSubmit = (e) => {
		e.preventDefault();
		//console.log("message body:", messageBody)
		if(messageBody===""||messageBody===" "){
			toast.error("Please input a message")
		}
		else{
			sendMessage({
				data:userAuthHeader,
				receiver_id: message_id,
				receiver_class: chatType,
				body: messageBody,
			})
				.then(res => {
					//update the messages by retrieving when you send one
					retrieveMsg(userAuthHeader,message_id,chatType)
						.then((res) => {
							setChat(res.data)
							sessionStorage.setItem("chatData", JSON.stringify(res.data));
							setScroll(true)
						})
						.catch((err) => {
							console.log(err)
						});
					
				}).catch(err => {
					console.log(err)
				})
		}
	
	}
	const handleChange = (e) => {
		setMessageBody(e.target.value)
	}
	//channel details

	return (
		<>
			{chatType!==""?
			<>
			{/* Chat content */}
				<div className="flex-1 flex flex-col bg-white pb-10">
					{/* Channel/User */}
					<div className="border-b flex px-6 py-2 ">
						<div className="flex flex-row items-space-between justify-center items-center w-full">
							<div className="flex:1 w-full text-grey-darkest mb-1 cursor-pointer hover:text-info">
								<span className="font-extrabold text-xl">
									{chatType==="User"&&userSelected.uid}
									{chatType==="Channel"&&
										<label htmlFor="channel-details-modal">{channelSelected.name}</label>
									}
								</span>
							</div>
							
							<label htmlFor="channel-details-modal" className="flex flex-row gap-2 border p-2 cursor-pointer hover:bg-base-200">
								<div className="flex ">
									{channelDetails.length!==0&&
									channelDetails.channel_members.map((member,index)=>{
										if(index===1||index===0||index===2){
											return(
												<div key={index}>
													<div className="flex items-center bg-base-300 justify-center w-7 h-7 -mx-1 overflow-hidden rounded-xl border-2 border-white">
														<span>{getUid(member.user_id).toUpperCase().charAt(0)}</span>
													</div>
												</div>
											)
										}
										
									})
									}
								</div>
								<div className="flex justify-center items-center"> 
								{chatType==="Channel"&&
									<div className="text-grey-dark text-sm">{channelDetails.length!==0&&channelDetails.channel_members.length}</div>
								}
								</div>
							</label>
						</div>
						
					</div>
					{/* Chat messages */}
					<div className="px-6 py-4 flex-1 overflow-y-scroll pb-7">
					{dates.map((date,index)=>{
						return(
							<div key={index}> 
								<div className="flex justify-center ">
									<div className=" badge bg-white border-base-300 text-black font-bold p-3">
										{date===dateToday&&"Today"}
										{date===dateYesterday&&"Yesterday"}
										{date!==dateToday&&date!==dateYesterday&&date}
									</div>
								</div>
								<hr className="-mt-3.5"></hr>
								<ChatGroupByDate groupDate={date}/>	
								<div ref={messagesEndRef} />
							</div>
						)
					})}
					</div>
					<div className="px-7 bg-white border-t fixed bottom-0 w-full">
						<div className="pt-2 pb-2  w-[80%] ">
							<form className="flex rounded-lg border-2 border-grey overflow-hidden" onSubmit={handleSubmit}>
								<input type="text" className="w-full px-4 focus:outline-none" placeholder="Message" onChange={handleChange}/>
								<button type="submit" className="cursor-pointer text-3xl text-grey border-l-2 border-grey p-2" onSubmit={handleSubmit}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-primary">
										<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
									</svg>
								</button>
							</form>
						</div>
					</div>
				</div>
			</>
			:
			<div className="flex-1 flex flex-col bg-white">
				<div className="border-b flex px-6 py-2 items-center flex-none">
					<div className="flex flex-col">
						<h3 className="text-grey-darkest mb-1 font-extrabold">Welcome</h3>
						<div className="text-grey-dark text-sm truncate"></div>
					</div>
				</div>
			</div>
			}
			<Toaster position="top-center" reverseOrder={false}/>
			<ChannelDetails/>
		</>
	);
};

export default Chat;
