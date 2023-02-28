import React, { useState, useContext, useEffect } from 'react'
import SearchModal from './common/SearchModal'
import { useNavigate } from 'react-router';
import Dialog from './common/Dialog';
import { UserContext } from "../hooks/UserContext";

const Navbar = () => {
    const navigate=useNavigate();
    const { userAuthHeader } = useContext(UserContext);
     const user = userAuthHeader;
    const [dialogue, setDialogue] = useState({
        message: "",
        isLoading: false,
    });

    const handleDialog = (message, isLoading) => {
        setDialogue({ message, isLoading });
    };

    const logoutConfirmation = (confirm) => {
    if (confirm) {
        //sessionStorage.removeItem("loggedInUserAuth");
        sessionStorage.clear();
        navigate("/login");
    } else {
        handleDialog("", false);
    }
    };

    const handleLogout = () => {
        handleDialog("Are you sure you want to sign out?", true);
    };

  return (
    <>
    <div className="flex bg-secondary p-1">
        <div className="flex flex-row gap-5">
             <div className="cursor-pointer p-1" title="Display only">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
					<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
				</svg>
			</div>
            <div className='cursor-pointer text-white p-1' title="Display only">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                
            </div>
            <div className='cursor-pointer text-white p-1' title="Display only">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </div>
            <div className='cursor-pointer text-white p-1' title="Display only">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        </div>
        
        <div className="flex-1">
            <div className='flex justify-center'>
            <div className="form-control w-[80%] " title="Search" >
                <label htmlFor="search-modal" placeholder="Search" className="cursor-pointer input input-sm input-bordered bg-info text-white">
                    <div className='flex flex-row relative'>
                        <span className=''>Search Avion School</span>
                        <div className='absolute right-6 p-1.5'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                            </svg>
                        </div>

                        <div className='absolute right-0 p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                    </div>
                </label>
            </div>
            </div>
     
        </div>
        <div className='flex flex-row gap-5'>
            <div className='cursor-pointer text-white p-1' title="Display only">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
            </div>
            <div className='justify-self-end'>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-sm bg-base-100 btn-square avatar hover:bg-base-300">
                        <div className="text-primary "> {user.uid.charAt(0)} </div>
                    </label>
                    <ul tabIndex={0} className="mt-1 p-1 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li><a className='hover:bg-white cursor-default'>{user.uid.toUpperCase()}</a></li>
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={handleLogout}>Sign Out</a></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
    {dialogue.isLoading && (
        <Dialog onDialog={logoutConfirmation} message={dialogue.message} />
    )} 
    <SearchModal/>
    </>
  )
}

export default Navbar