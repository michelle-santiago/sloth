import React,{ useContext, useEffect } from 'react'
import dateFormatYear from '../helper/dateFormatYear';
import getUid from '../helper/getUid';
import { UserContext } from '../../hooks/UserContext';
const ChannelDetails = () => {
    const { channelDetails  } = useContext(UserContext);

  return (
    <>
    {channelDetails.length!==0&&
    <div>
        <input type="checkbox" id="channel-details-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <div className="p-2 flex flex-row gap-2 ">
                    <div className='w-full text-xl flex flex-row items-center gap-2 font-bold '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        <span>{channelDetails.name}</span>
                    </div>
                    <label htmlFor="channel-details-modal" className="cursor-pointer hover:bg-base-200 p-2">✕</label>
                </div>
                <div className='card border p-4 m-1'>
                    <div className='font-bold'>About</div>
                    <hr className='mt-2 mb-2'></hr>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Created by </span>
                        <span className='px-2'>{getUid(channelDetails.owner_id)} on {dateFormatYear(channelDetails.created_at)}</span>
                    </div>
                    <hr className='mt-2 mb-2'></hr>
                    <div className='font-bold'>Members:</div>
                    <div className="rounded my-2 pin-t pin-l h-40 overflow-y-scroll">
                        <div className="list-reset">
                            {channelDetails.channel_members.map((member,index)=>{  
                                return(
                                    <div key={index} className="flex flex-row justify-center items-center pt-2">
                                        <div className="avatar placeholder px-2">
                                            <div className="bg-white-focus border  bg-base-300 text-neutral-content rounded-xl w-8 h-8">
                                                <span className="text-primary">{getUid(member.user_id).toUpperCase().charAt(0)}</span>
                                            </div>
                                        </div> 
                                        <div className="flex-1 overflow-hidden">
                                            <span className="font-bold">{getUid(member.user_id)}</span>
                                        </div>
                                    </div>
                                )
                            })

                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
    </>
  )
}

export default ChannelDetails