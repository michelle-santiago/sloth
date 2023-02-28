import React, { useContext } from 'react'
import dateFormatYear from '../helper/dateFormatYear';
import getUid from '../helper/getUid';
import { UserContext } from '../../hooks/UserContext';
const ChannelDetails = () => {
    const { users, channelDetails  } = useContext(UserContext);

    return (
    <>
    { channelDetails.length !== 0 &&
        <div>
            <input type="checkbox" id="channel-details-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className="p-2 flex flex-row gap-2 ">
                        <div className='w-full text-xl flex flex-row items-center gap-2 font-bold '>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                            </svg>
                            <span>{ channelDetails.name }</span>
                        </div>
                        <label htmlFor="channel-details-modal" className="cursor-pointer hover:bg-base-200 p-2">✕</label>
                    </div>
                    <div className='card border p-4 m-1'>
                        <div className='font-bold'>About</div>
                        <hr className='mt-2 mb-2'></hr>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Created by </span>
                            <span className='px-2'>{ getUid(users, channelDetails.owner_id) } on { dateFormatYear(channelDetails.created_at) }</span>
                        </div>
                        <hr className='mt-2 mb-2'></hr>
                        <div className='font-bold'>Members:</div>
                        <div className="rounded my-2 pin-t pin-l h-40 overflow-y-scroll">
                            <div className="list-reset">
                                { channelDetails.channel_members.map((member, index)=>{  
                                    return(
                                        <div key={ index } className="flex flex-row justify-center items-center pt-2">
                                            <div className="avatar placeholder px-2">
                                                <div className="bg-white-focus border  bg-base-300 text-neutral-content rounded-xl w-8 h-8">
                                                    <span className="text-primary">{ !getUid(users, member.user_id)? "" : getUid(users, member.user_id).toUpperCase().charAt(0) }</span>
                                                </div>
                                            </div> 
                                            <div className="flex-1 overflow-hidden">
                                                <span className="font-bold">{ getUid(users, member.user_id)}</span>
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