import React,{ useContext, useState } from 'react'
import { UserContext } from '../../hooks/UserContext';
import { retrieveMsg, retrieveChannelDetails } from '../../api/api';
const NewMessageSearch = () => {

    const { userAuthHeader, users,channel, setUserSelected, usersSelected, setChannelSelected, setChatType, setChat } = useContext(UserContext);
    const [ list, setList ]=useState([])
    const [searchValue, setSearchValue]=useState("")
    const [ type, setType ]=useState()

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchValue(search)
    let result;
    //search for user
    if(search.includes("@")){
        //console.log("may @")
        setType("User")
        if(search==="@"){
            result= users;
        }else{
            result= users.filter((value) => {
                return value.uid.toLowerCase().includes(search.toLowerCase().slice(1))
            })
        }
    }
    //search for channel
    if(search.includes("#")){
        //console.log("may #")
        setType("Channel")
        if(search==="#"){
            result= channel;
            //console.log(channel)
        }else{
            result= channel.filter((value) => {
                return value.name.toLowerCase().includes(search.toLowerCase().slice(1))
            })
        }
    }
    

    if(search===""||search===" "){
      setList([])
    }else{
      setList(result)
    }
  }
  const handleSelectedUser=(user)=>{
    setChatType("User")
    sessionStorage.setItem("chatTypeData", JSON.stringify("User"));
    setUserSelected(user)
    sessionStorage.setItem("userSelected", JSON.stringify(user));

    retrieveMsg(userAuthHeader,user.id,"User")
    .then((res) => {
      setChat(res.data)
      sessionStorage.setItem("chatData", JSON.stringify(res.data));
    })
    .catch((err) => {
        console.log(err[0])
    });
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
    sessionStorage.setItem("usersSelected", JSON.stringify(usersSelected));
  }
  const handleSelectedChannel=(channel)=>{
    setChatType("Channel")
    sessionStorage.setItem("chatTypeData", JSON.stringify("Channel"));
    sessionStorage.setItem("channelSelected", JSON.stringify(channel));
    setChannelSelected(channel)
    //set channel details
    retrieveChannelDetails(userAuthHeader,channel.id)
    .then((res) => {
        setChannelDetails(res.data)
        sessionStorage.setItem("channelDetails", JSON.stringify(res.data));
    })
    .catch((err) => {
        console.log(err)
    });
    //set chat 
    retrieveMsg(userAuthHeader,channel.id,"Channel")
    .then((res) => {
      setChat(res.data)
      sessionStorage.setItem("chatData", JSON.stringify(res.data));
    })
    .catch((err) => {
        console.log(err[0])
    });
  }
  return (
    <>
     <div className="rounded p-0 w-full bg-white">
        <div className="px-4 py-4 flex flex-row items-center gap-2 border-b">
            <div>To: </div>
            <input placeholder="#a-channel, @somebody, somebody@example.com" className="rounded h-8 w-full focus:outline-none" value={searchValue} onChange={handleSearch}/>
            <span className='cursor-pointer text-sm' onClick={()=>{setSearchValue(""); setList([])}}>Clear</span>
        </div>
        <div className="rounded pin-t pin-l h-60 overflow-y-scroll">
            <ul className="list-reset">
              {list&&list.map((data,index)=>{
                return(
                <div key={index}>
                    <li  className="w-full hover:bg-neutral">
                    <label htmlFor="search-modal" className="px-7 p-2 block text-black cursor-pointer hover:text-white"
                        onClick={()=>{
                            type==="User"&&handleSelectedUser(data)
                            type==="Channel"&&handleSelectedChannel(data)
                            }
                            }>
                        {type==="User"&&data.uid}
                        {type==="Channel"&&data.name}
                    </label>
                    </li>
                </div>
                )
               
              })}
            </ul>
          </div>
      </div>
    </>
  )
}

export default NewMessageSearch