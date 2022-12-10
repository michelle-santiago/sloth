import React, { useContext } from 'react'
import { UserContext } from '../../hooks/UserContext';
import dateFormat from '../helper/dateFormat';
import timeFormat from '../helper/timeFormat';
const ChatGroupByDate = ({groupDate}) => {
    const { chat } = useContext(UserContext);
    return(
        <div>
            {chat.map((message,index)=>{
                const date=dateFormat(message.created_at)
                if(date===groupDate){
                    return(
                        <div key={index}>
                            <div className="flex items-start mb-4 text-sm pt-5">
                                <div className="avatar placeholder px-2">
                                    <div className="bg-white-focus border  bg-base-300 text-neutral-content rounded-xl w-10 h-10">
                                        <span className="text-primary">{message.sender.uid.toUpperCase().charAt(0)}</span>
                                    </div>
                                </div> 
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex flex-row gap-2">
                                        <span className="font-bold">{message.sender.uid}</span>
                                        <span className="text-grey text-xs pt-0.5">{timeFormat(message.created_at)}</span>
                                    </div>
                                    <p className="text-black leading-normal">{message.body}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
   
  
}

export default ChatGroupByDate