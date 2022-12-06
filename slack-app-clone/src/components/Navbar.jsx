import React from 'react'

const Navbar = () => {
  return (
    <div className="flex bg-primary p-1">
        <div className="flex-1">
        </div>
        <div className="flex-1 ">
            <div className='flex flex-row gap-2'>
            <div className="form-control w-full ">
                <input type="text" placeholder="Search" className="w-full input input-sm input-bordered" />
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-sm bg-white btn-circle avatar">
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
                    <li><a>Logout</a></li>
                </ul>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar