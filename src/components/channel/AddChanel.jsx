import React, { useContext, useEffect, useInsertionEffect, useState } from 'react'
import { UserContext } from '../../hooks/UserContext';
import SearchMember from './SearchMember';
import { addMember, createChannel, retrieveChannels, retrieveChannelDetails } from '../../api/api';
import toast from 'react-hot-toast';

const AddChannel = () => {
    const { userAuthHeader,membersSelected, setMembersSelected, setChannel, setChannelDetails, addMemberType, channelSelected } = useContext(UserContext);
    const [name, setName]=useState("")
    //reset members selected when closed
    const resetMembers=()=>{
        setMembersSelected([])
        sessionStorage.setItem("membersSelected", JSON.stringify([]));
    }
    //remove member from the list
    const handleDeleteSelectedMember=(memberData)=>{
		const filteredUsers=membersSelected.filter((member)=>{
            return member.id !== memberData.id
        })
        setMembersSelected(filteredUsers);
        sessionStorage.setItem("membersSelected", JSON.stringify(filteredUsers));
		
	}
   
    //for create channel with members
    const handleCreateChannel=()=>{
        const userIDS=membersSelected.map((member)=>{
            return member.id
        })
        
        if(name===""||name===" "){
			toast.error("Please input a channel name")
		}
        else if(userIDS.length===0){
            toast.error("Please add a member") 
        }
        else{
            createChannel({
				data:userAuthHeader,
				name: name,
				user_ids: userIDS,
			})
            .then(res => {
                
                if(res.data.errors){
                    if(res.data.errors.length>0){
                        toast.error(res.data.errors[0])
                    }
                   
                }else{ 
                    toast.success("Channel Successfully Created")
                    //update the channels
                    retrieveChannels(userAuthHeader)
                        .then((res) => {
                        sessionStorage.setItem("userChannels", JSON.stringify(res.data));
                        setChannel(res.data)
                        })
                        .catch((err) => {
                            toast.error(err.response.data.errors[0])
                        });
                }
                       
			}).catch(err => {
                console.log(err) 
			})
        }
    }
    //for add member/s to channels
    const handleAddMembertoChannel=()=>{
        const userIDS=membersSelected.map((member)=>{
            return member.id
        })
        
        if(userIDS.length===0){
            toast.error("Please add a member") 
        }
        else{
            //loop through selected ids and add all to channel
            userIDS.forEach(user_id => {
                console.log(user_id)
                
                addMember({
                    data:userAuthHeader,
                    id: channelSelected.id,
                    member_id: user_id,
                })
                .then(res => {
                    
                    if(res.data.errors){
                        if(res.data.errors.length>0){
                            toast.error(res.data.errors[0])
                        }
                       
                    }else{ 
                        toast.success("Member/s Successfully Added")
                        retrieveChannelDetails(userAuthHeader,channelSelected.id)
                        .then((res) => {
                            setChannelDetails(res.data)
                            sessionStorage.setItem("channelDetails", JSON.stringify(res.data));
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                        }
                           
                }).catch(err => {
                    console.log(err) 
                })
            });
              
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(addMemberType==="AddChannel"){
            handleCreateChannel()
        }
        if(addMemberType==="AddMember"){
            handleAddMembertoChannel()
        }
        
        
    }
    const handleChange = (e) => {
		setName(e.target.value)
	}

 
  return (
    <>
    <input type="checkbox" id="add-channel" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box relative p-0 ">
            <div className="flex flex-row gap-2 px-5 pt-5">
                {addMemberType==="AddChannel"&&
                    <h1 className='w-full text-xl font-bold'>Add Channel</h1>
                }
                {addMemberType==="AddMember"&&
                    <div className='flex flex-row w-full justify-center items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                        <h1 className=' text-xl font-bold w-full'>{channelSelected.name}</h1>   
                    </div>
                }
                <label htmlFor="add-channel" className="cursor-pointer" title="Close"  onClick={resetMembers}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </label>
            </div>
            <form className='card border px-5 py-5 mx-5 my-5'onSubmit={handleSubmit}>
                {addMemberType==="AddChannel"&&
                <>
                    <div className='font-bold pb-2 '>Channel Name</div>
                    <div className='px-2 border-b mt-1'>
                        <input placeholder="Channel Name" className="h-8 w-full focus:outline-none" onChange={handleChange}/>
                    </div>
                </>
                }
                <div className='font-bold pt-2'>Add Members</div>
                <div className="px-2 flex flex-row items-center gap-2 border-b">
                    <label htmlFor="search-member" className="rounded h-8 w-full focus:outline-none">
                        <span className='opacity-50'>Search for a member</span>
                    </label>
                </div>   
                <SearchMember/>
                <div className="rounded">
                        <ul className="list-reset h-40 overflow-y-scroll">
                            {membersSelected.length!==0&&membersSelected.map((member)=>{
                                return(
                                <li key={member.uid} className="flex flex-row gap-2 hover:bg-neutral hover:text-white">
                                    <label className="px-1 block cursor-pointer"
                                        onClick={()=>{}}>
                                        <span>{member.uid}</span>
                                    </label>
                                    <div className="fixed right-10 text-white pr-1 cursor-pointer"  onClick={()=>{ handleDeleteSelectedMember(member)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </li>
                                )
                            })}
                        </ul>
                </div>
                <div className='pt-5 flex justify-end'>
                    <button type="submit" className='btn normal-case' onSubmit={handleSubmit}>Add</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default AddChannel