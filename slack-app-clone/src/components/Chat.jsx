import React from 'react'
import useUserApi from '../hooks/useUserApi';

const Chat = () => {
    const { userAuth }=useUserApi();
    console.log("User check: ",userAuth.uid);
    return (
        <>
        {/* Chat content */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
                {/* Channels*/}
                <div className="border-b flex px-6 py-2 items-center flex-none">
                    <div className="flex flex-col">
                        <h3 className="text-grey-darkest mb-1 font-extrabold">#general</h3>
                        <div className="text-grey-dark text-sm truncate">
                            Lorem impsum
                        </div>
                    </div>
                </div>
                {/* Chat messages */}
                <div className="px-6 py-4 flex-1 overflow-y-scroll">
                    {/* Message */}
                    <div className="flex items-start mb-4 text-sm">
                        <div className="flex-1 overflow-hidden">
                            <div>
                                <span className="font-bold">Chuchu </span>
                                <span className="text-grey text-xs">11:46</span>
                            </div>
                            <p className="text-black leading-normal">Hello</p>
                        </div>
                    </div>
                    {/* Message */}
                    <div className="flex items-start mb-4 text-sm">
                        <div className="flex-1 overflow-hidden">
                            <div>
                                <span className="font-bold">Chacha </span>
                                <span className="text-grey text-xs">12:45</span>
                            </div>
                            <p className="text-black leading-normal">Hello world</p>
                        
                        </div>
                    </div>
                    
                    <div className="pb-6 px-4 flex-none">
                        <div className="flex rounded-lg border-2 border-grey overflow-hidden">
                            <span className="text-3xl text-grey border-r-2 border-grey p-2">
                                <svg className="fill-current h-6 w-6 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/></svg>
                                </span>
                            <input type="text" className="w-full px-4" placeholder="Message #general" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat