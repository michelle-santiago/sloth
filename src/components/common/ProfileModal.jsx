import React from 'react'

const ProfileModal = () => {
  return (
    <>
        <input type="checkbox" id="profile-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <label htmlFor="profile-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <div className="photo-wrapper p-2">
                    <div className="w-32 h-32 bg-base-300 rounded mx-auto"></div>
                </div>
                <div className="p-2">
                    <h3 className="text-center text-xl text-gray-900 font-medium leading-8">MISHIL@EXAMPLE.COM</h3>
                    <div className="text-center text-gray-400 text-xs font-semibold">
                        <p>Student</p>
                    </div>
                    <table className="text-xs my-3">
                        <tbody>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Member Since</td>
                                <td className="px-2 py-2">December 6, 2022</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Channels</td>
                                <td className="px-2 py-2">
                                    <p className='flex gap-2'>
                                        <span className="badge">One</span>
                                        <span className="badge">Two</span>
                                        <span className="badge">Three</span>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-center gap-5'>
                    <button className='btn btn-ghost btn-sm border-base-300 normal-case'>
                        <div className='flex flex-row gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                            <span>Message</span>
                        </div>
                    </button>
                    <button className='btn btn-ghost btn-sm border-base-300 normal-case'>
                        <div className='flex flex-row gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                            <span>Huddle</span>
                        </div>
                    </button>
                   
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfileModal