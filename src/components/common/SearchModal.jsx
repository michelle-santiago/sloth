import React, { useContext, useState } from 'react'
import { UserContext } from '../../hooks/UserContext';
import ProfileModal from './ProfileModal';
import { retrieveMsg} from "../../api/api";
const SearchModal = () => {
  const { userAuthHeader, users, setUserSelected, usersSelected, setChatType, setChat } = useContext(UserContext);
  const [ usersList, setUsersList ]=useState([])
  const [searchValue, setSearchValue]=useState("")
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchValue(search)
    const usersResult= users.filter((value) => {
      return value.uid.toLowerCase().includes(search.toLowerCase())
    })

    if(search===""||search===" "){
      setUsersList([])
    }else{
      setUsersList(usersResult)
    }
    //console.log("usersData",usersResult)
  }
  const handleSelectedUser=(user)=>{
    setChatType("User")
    sessionStorage.setItem("chatTypeData", JSON.stringify("User"));
    //console.log("receiver id",user.id)
    //console.log("receiver email",user.uid)
    setUserSelected(user)
    sessionStorage.setItem("userSelected", JSON.stringify(user));

    retrieveMsg(userAuthHeader,user.id,"User")
    .then((res) => {
      //console.log("RESPONSE MSG:",res.data)
      setChat(res.data)
      sessionStorage.setItem("chatData", JSON.stringify(res.data));
    })
    .catch((err) => {
        console.log(err[0])
    });
    //console.log("before: ",usersSelected)
    let found=false;
    if(usersSelected.length!==0){
      usersSelected.forEach(userData => {
        if(userData.id===user.id){
          found=true;
        }
      });
    }

    if(found===false){
      usersSelected.push(user)
    }
    //console.log("after:",usersSelected)
    sessionStorage.setItem("usersSelected", JSON.stringify(usersSelected));
  }
  return (
    <>
    <input type="checkbox" id="search-modal" className="modal-toggle" />
    <div className="modal">
      <div className="rounded fixed top-0.5 p-0 w-[70%] bg-white">
        <div className="px-4 py-4 flex flex-row items-center gap-2 border-b">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </div>
            <input placeholder="Search for a member" className="rounded h-8 w-full focus:outline-none" value={searchValue} onChange={handleSearch}/>
            <span className='cursor-pointer text-sm' onClick={()=>{setSearchValue(""); setUsersList([])}}>Clear</span>
            <div className="cursor-pointer" title="Display only">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
            </div>
            <label htmlFor="search-modal" className="cursor-pointer" title="Close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </label>
            
        </div>
        <div className="rounded pin-t pin-l h-40 overflow-y-scroll">
            <ul className="list-reset">
              {usersList.map((user)=>{
                return(
                <li key={user.uid} className="w-full hover:bg-neutral">
                  <label htmlFor="search-modal" className="px-7 p-2 block text-black cursor-pointer hover:text-white"
                      onClick={()=>{handleSelectedUser(user)}}>
                    {user.uid}
                  </label>
                </li>
                )
              })}
            </ul>
          </div>
      </div>
    </div>
    {/*<ProfileModal/>*/}
    </>
  )
}

export default SearchModal