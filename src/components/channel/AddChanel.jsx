import React, { useContext, useEffect, useInsertionEffect, useState } from 'react'
import { UserContext } from '../../hooks/UserContext';
import SearchMember from './SearchMember';
import { createChannel, retrieveChannels } from '../../api/api';
import toast from 'react-hot-toast';

const AddChannel = () => {
    const { userAuthHeader,membersSelected, setMembersSelected, setChannel } = useContext(UserContext);
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

    const handleSubmit=(e)=>{
        e.preventDefault()
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
                    //retrive channels created
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
    const handleChange = (e) => {
		setName(e.target.value)
	}
  return (
    <>
    <input type="checkbox" id="add-channel" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box relative p-0 ">
            <div className="flex flex-row gap-2 px-5 pt-5">
                <h1 className='w-full text-xl font-bold'>Add Channel</h1>
                <label htmlFor="add-channel" className="cursor-pointer" title="Close"  onClick={resetMembers}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </label>
            </div>
            <form className='card border px-5 py-5 mx-5 my-5'onSubmit={handleSubmit}>
                <div className='font-bold pb-2 '>Channel Name</div>
                <div className='px-2 border-b mt-1'>
                    <input placeholder="Channel Name" className="h-8 w-full focus:outline-none" onChange={handleChange}/>
                </div>
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