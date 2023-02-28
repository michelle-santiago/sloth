import React, {useEffect, useContext} from 'react'
import { UserContext } from '../hooks/UserContext';
import { retrieveUsers } from '../api/api';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import Navbar from '../components/Navbar';
const Home = () => {
  const { userAuthHeader, setUsers } = useContext(UserContext);
  const user=userAuthHeader;

  useEffect(()=>{
    retrieveUsers(user)
    .then((res) => {
       //console.log("respons e users:",res.data)
       sessionStorage.setItem("usersData", JSON.stringify(res.data));
       setUsers(res.data)
    })
    .catch((err) => {
        toast.error(err.response.data.errors[0])
    }); 
  },[])

  return (
    <>  
        <div className="h-screen flex flex-col">
            <div className='w-full'>
                <Navbar/>
            </div>
            <div className='flex h-full overflow-hidden'>
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    </>
  )
}

export default Home