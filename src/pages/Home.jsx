import React from 'react'
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import Navbar from '../components/Navbar';
const Home = () => {
  
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