import React, {useState} from 'react'
import { useNavigate } from 'react-router';
import useUserApi from '../hooks/useUserApi';
import Dialog from './common/Dialog';
const Sidebar = () => {
    const navigate=useNavigate();
    const { userAuth }=useUserApi();
    console.log("User check: ",userAuth.uid);
    //temporary
    const userUID="michelle@email.com"
    const [dialogue, setDialogue] = useState({
      message: "",
      isLoading: false,
    });
    const handleDialog = (message, isLoading) => {
      setDialogue({ message, isLoading });
    };
  const logoutConfirmation = (confirm) => {
      if (confirm) {
          sessionStorage.removeItem("loggedInUserAuth");
          navigate("/login");
      } else {
        handleDialog("", false);
      }
    };
  
    const handleLogout = () => {
      handleDialog("Are you sure you want to logout?", true);
    };
  return (
    <div className="bg-primary flex-none w-64 pb-6">
        <div className="text-white mb-2 mt-3 px-4 flex justify-between">
            <div className="flex-auto">
                <h1 className="font-semibold text-xl leading-tight mb-1 truncate">Avion School</h1>
                <div className="flex items-center m-2">
                    <svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/></svg>
                    <span className="text-white opacity-50 text-sm">{userAuth.uid.toUpperCase()}</span>
                </div>
            </div>
            <div>
                <svg className="h-6 w-6 fill-current text-white opacity-25" viewBox="0 0 20 20">
                    <path d="M14 8a4 4 0 1 0-8 0v7h8V8zM8.027 2.332A6.003 6.003 0 0 0 4 8v6l-3 2v1h18v-1l-3-2V8a6.003 6.003 0 0 0-4.027-5.668 2 2 0 1 0-3.945 0zM12 18a2 2 0 1 1-4 0h4z" fill-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="mb-8">
            <div className="px-4 mb-2 text-white flex justify-between items-center">
                <div className="opacity-75">Channels</div>
                <div>
                    <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                    </svg>
                </div>
            </div>
            <div className="bg-teal-dark py-1 px-4 text-white">#general</div>
        </div>
        <div className="mb-8">
            <div className="px-4 mb-2 text-white flex justify-between items-center">
                <div className="opacity-75">Direct Messages</div>
                <div>
                    <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                    </svg>
                </div>
            </div>
            <div className="flex items-center mb-3 px-4">
                <svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/></svg>
                <span className="text-white opacity-75">{userAuth.uid}<span className="text-grey text-sm">(you)</span></span>
            </div>
            <div className="flex items-center mb-3 px-4">
                <svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/></svg>
                <span className="text-white opacity-75">test@email.com</span>
            </div>
            <div className="flex m-2">
            <button id="modal-logout" className="logout" onClick={handleLogout} title="Log Out">
                <div className='flex flex-row text-white opacity-50'>
                Sign Out
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                </div>
            </button>
        </div>
        </div> 
        {dialogue.isLoading && (
            <Dialog onDialog={logoutConfirmation} message={dialogue.message} />
        )} 
    </div>
  )
}

export default Sidebar