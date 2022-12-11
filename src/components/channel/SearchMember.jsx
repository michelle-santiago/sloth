import React,{ useContext, useState, useEffect } from 'react'
import { UserContext } from '../../hooks/UserContext'
import toast from 'react-hot-toast';
const SearchMember = () => {
    const {  users, membersSelected, setMembersSelected } = useContext(UserContext);
    const [membersList,setMembersList]=useState([])
    const [members, setMembers]=useState()

    //reset selected members at the start
    useEffect(()=>{
        resetMembers()
    },[])

    const resetMembers=()=>{
        setMembersSelected([])
        sessionStorage.setItem("membersSelected", JSON.stringify([]));
    }
    //update members selected when a member is selected
    useEffect(()=>{
        if(members){
            const membersSelectedData = JSON.parse(sessionStorage.getItem("membersSelected"))
            setMembersSelected(membersSelectedData)
        }  
    },[members])

    const handleSearch = (e) => {
        const search = e.target.value;
        const membersResult= users.filter((value) => {
          return value.uid.toLowerCase().includes(search.toLowerCase())
        })
    
        if(search===""||search===" "){
          setMembersList([])
        }else{
          setMembersList(membersResult)
        }
    }
    const handleSelectedMember=(member)=>{
        let found=false;
        if(membersSelected.length!==0){
            membersSelected.forEach(memberData => {
            if(memberData.id===member.id){
                found=true;
                toast.error("Member already selected")
            }
            });
        }
        if(found===false){
            membersSelected.push(member)   
        }
        sessionStorage.setItem("membersSelected", JSON.stringify(membersSelected));
    }     
    
    return (
    <>
    <input type="checkbox" id="search-member" className="modal-toggle" />
    <div className="modal">
        <div className="modal-box ">
            <div className="flex flex-row items-center gap-2 border-b">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <input placeholder="Search for a member" className="rounded h-8 w-full focus:outline-none" onChange={handleSearch}/>
                <div className="cursor-pointer" title="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                </div>
                <label htmlFor="search-member" className="cursor-pointer" title="Close">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </label>
            </div>
            <div className="rounded my-2 h-60 overflow-y-scroll overflow-hidden">
                <ul className="list-reset   ">
                    {membersList.map((member)=>{
                        return(
                        <li key={member.uid} className="hover:bg-neutral hover:text-white">
                            <label htmlFor="search-member" className="px-1 block cursor-pointer"
                                onClick={()=>{
                                        handleSelectedMember(member)
                                        setMembers(member)
                                    }}>
                                <span>{member.uid}</span>
                            </label>
                            
                        </li>
                        )
                    })}
                </ul>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default SearchMember