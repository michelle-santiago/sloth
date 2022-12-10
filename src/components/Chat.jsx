import React, { useContext, useEffect } from "react";
import { UserContext } from "../hooks/UserContext";
import ChatGroupByDate from "./common/ChatGroupByDate";
import dateFormat from "./helper/dateFormat";
const Chat = () => {
	const { userSelected,channelSelected, chatType, chat  } = useContext(UserContext);
	//console.log("chat type: ", chatType)
	//console.log("chat: ", chat)
	//console.log("channel: ", channelSelected)
	const today= new Date();
	const yesterday= new Date(today);
	yesterday.setDate(yesterday.getDate() - 1)
    const dateToday=dateFormat(today);
	const dateYesterday=dateFormat(yesterday);
    //console.log("today",dateToday,"yesterday",dateYesterday)

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

	return (
		<>
			{chatType!==""?
			<>
			{/* Chat content */}
				<div className="flex-1 flex flex-col bg-white pb-10">
					{/* Channel/User */}
					<div className="border-b flex px-6 py-2 items-center flex-none">
						<div className="flex flex-col">
							<h3 className="text-grey-darkest mb-1 font-extrabold">
								{chatType==="User"&&userSelected.uid}
								{chatType==="Channel"&&channelSelected.name}
							</h3>
							<div className="text-grey-dark text-sm truncate">Lorem impsum</div>
						</div>
					</div>
					{/* Chat messages */}
					<div className="px-6 py-4 flex-1 overflow-y-scroll">
					{dates.map((date)=>{
						return(
							<> 
								<div className="flex justify-center ">
									<div className=" badge bg-white border-base-300 text-black font-bold p-3">
										{date===dateToday&&"Today"}
										{date===dateYesterday&&"Yesterday"}
										{date!==dateToday&&date!==dateYesterday&&date}
									</div>
								</div>
								<hr className="-mt-3"></hr>
								<ChatGroupByDate groupDate={date}/>
							</>
						)
					})}
						
					</div>
					<div className="px-7 bg-white border-t fixed bottom-0 w-full">
						<div className="pt-2 pb-2  w-[80%] ">
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
		</>
	);
};

export default Chat;
