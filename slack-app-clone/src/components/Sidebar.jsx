import React, { useContext, useState } from "react";
import { UserContext } from "../hooks/UserContext";
import AddChannel from "./common/AddChanel";
const Sidebar = () => {
	const { userAuth } = useContext(UserContext);
	console.log("User check: ", userAuth.uid);

	return (
		<div className="bg-primary flex-none w-64 pb-6">
			<div className="text-white mb-2 mt-3 px-4 flex justify-between">
				<div className="flex-auto">
					<h1 className="font-semibold text-xl leading-tight mb-1 truncate">Avion School</h1>
					<div className="flex items-center m-2">
						<svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20">
							<circle cx="10" cy="10" r="10" />
						</svg>
						<span className="text-white opacity-50 text-sm">{userAuth.uid.toUpperCase()}</span>
					</div>
				</div>
				<div>
					<svg className="h-6 w-6 fill-current text-white opacity-25" viewBox="0 0 20 20">
						<path
							d="M14 8a4 4 0 1 0-8 0v7h8V8zM8.027 2.332A6.003 6.003 0 0 0 4 8v6l-3 2v1h18v-1l-3-2V8a6.003 6.003 0 0 0-4.027-5.668 2 2 0 1 0-3.945 0zM12 18a2 2 0 1 1-4 0h4z"
							fill-rule="evenodd"
						/>
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
					<div>
						<svg
							className="fill-current h-4 w-4 opacity-50"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
						</svg>
					</div>
				</div>
				<div className="flex items-center mb-3 px-4">
					<svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20">
						<circle cx="10" cy="10" r="10" />
					</svg>
					<span className="text-white opacity-75">
						{userAuth.uid}
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
