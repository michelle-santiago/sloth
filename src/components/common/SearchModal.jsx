import React, { useContext, useState } from 'react'
import { UserContext } from '../../hooks/UserContext';
import ProfileModal from './ProfileModal';
import { retrieveDirectMsg} from "../../api/api";
const SearchModal = () => {
  const { userAuthHeader, users, setUserSelected, usersSelected, setUsersSelected, setChatType, setChat } = useContext(UserContext);
  const [ usersList, setUsersList ]=useState([])
  const handleSearch = (e) => {
    const search = e.target.value;
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

    retrieveDirectMsg(userAuthHeader,user.id,"User")
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
      <div className="modal-box">
        <div className="p-2 flex flex-row gap-2 border-b">
            <input placeholder="Search" className="rounded h-8 w-full focus:outline-none" onChange={handleSearch}/>
            <label htmlFor="search-modal" className="cursor-pointer">✕</label>
        </div>
        <div className="rounded my-2 pin-t pin-l h-40 overflow-y-scroll">
            <ul className="list-reset">
              {usersList.map((user)=>{
                return(
                <li key={user.uid} >
                  <label htmlFor="search-modal" className="p-2 block text-black hover:bg-grey-light cursor-pointer hover:text-primary"
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