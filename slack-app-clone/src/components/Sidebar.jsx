import React, { useContext, useState } from "react";
import { UserContext } from "../hooks/UserContext";
import AddChannel from "./common/AddChanel";
const Sidebar = () => {
	const { userAuthHeader } = useContext(UserContext);
    const user=userAuthHeader;
	console.log("User check side: ", user.uid);

	return (
		<div className="bg-primary flex-none w-64 pb-6">
			<div className=" mb-2 px-4 flex justify-between border-b border-t border-accent pt-2 pb-2">
				<div className="flex-auto text-white">
					<h1 className="font-semibold text-xl leading-tight mb-1 truncate">Avion School</h1>
				</div>
				<div className="bg-white rounded-full avatar p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
				</div>
			</div>
			<div className="mb-8">
				<div className="px-4 mb-2 text-white flex justify-between items-center">
					<div className="opacity-75">Channels</div>
					<label htmlFor="add-channel">
						<svg
							className="fill-current h-4 w-4 opacity-50"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
						</svg>
					</label>
				</div>
				<div className="bg-teal-dark py-1 px-4 text-white">#general</div>
			</div>
			<div className="mb-8">
				<div className="px-4 mb-2 text-white flex justify-between items-center">
					<div className="opacity-75">Direct Messages</div>
				</div>
				<div className="flex items-center mb-3 px-4">
					<svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20">
						<circle cx="10" cy="10" r="10" />
					</svg>
					<span className="text-white opacity-75">
						{user.uid}
						<span className="text-grey text-sm">(you)</span>
					</span>
				</div>
				<div className="flex items-center mb-3 px-4">
					<svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20">
						<circle cx="10" cy="10" r="10" />
					</svg>
					<span className="text-white opacity-75">test@email.com</span>
				</div>
			</div>

			<AddChannel />
		</div>
	);
};

export default Sidebar;
