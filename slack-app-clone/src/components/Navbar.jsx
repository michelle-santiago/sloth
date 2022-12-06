import React, { useState } from 'react'
import SearchModal from './common/SearchModal'
import { useNavigate } from 'react-router';
import Dialog from './common/Dialog';
const Navbar = () => {
    const navigate=useNavigate();

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
    handleDialog("Are you sure you want to sign out?", true);
    };

  return (
    <>
    <div className="flex bg-primary p-1">
        <div className="flex-1">
        </div>
        <div className="flex-1 ">
            <div className='flex flex-row gap-2'>
            <div  className="form-control w-full">
                <label htmlFor="search-modal" placeholder="Search" className="w-full input input-sm input-bordered">Search</label>
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-sm bg-white btn-square avatar">
                    <div className="w-5 rounded-full">
                    </div>
                </label>
                <ul tabIndex={0} className="mt-1 p-1 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
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