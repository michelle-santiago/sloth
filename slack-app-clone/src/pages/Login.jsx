import React, { useContext, useState } from 'react'
import { loginFields } from "../constants/formFields"
import { signIn } from '../api/api';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { UserContext } from "../hooks/UserContext";
import toast, { Toaster } from 'react-hot-toast';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field  => fieldsState[field.id] = '');

const Login = () => {
    const [ loginState, setLoginState ] = useState(fieldsState);
    const navigate = useNavigate();
    const {
		updateUserAuthHeader,
		setId,
	} = useContext(UserContext);

    const handleSubmit = async (e) => {
		e.preventDefault();
		signIn({
			email: loginState.emailAddress,
			password: loginState.password,
		})
        .then((res) => {
            updateUserAuthHeader({
                "access-token":  res.headers["access-token"],
                client: res.headers.client,
                expiry: res.headers.expiry,
                uid: res.headers.uid,
            });
            setId(res.data.data.id);
            toast.success("Login Successful")
            navigate("/home");
        })
        .catch((err) => {
            toast.error(err.response.data.errors[0])
        });
	};

    const handleChange = (e) => {
        setLoginState({...loginState, [e.target.id] : e.target.value})
    }
    return (
     <>
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 z-9">
            <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
                <h1 className="">Log in to your slack account</h1>
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        {fields.map((field,index) =>
                        <div key={index}>
                            <label htmlFor={field.labelFor}  className="block text-sm font-semibold leading-6 text-gray-900">
                                {field.labelText}
                            </label>
                            <input
                                onChange={handleChange}
                                value={loginState[field.id]}
                                id={field.id}
                                name={field.name}
                                type={field.name}
                                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                                placeholder={field.placeholder}
                            />
                        </div>
                        )}
                    </div>
                    <button type="submit" className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full" onSubmit={ handleSubmit }>
                        Login
                    </button>
                    <div className="pt-5 space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4">
                        <p className="text-center sm:text-left">Don't have an account?</p>
                        <NavLink  to="/signup"  className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
                            Sign Up
                        </NavLink>
                    </div>
                </form>
            </div>
            <Toaster position="top-center" reverseOrder={false}/>
        </div>
        
    </>
    )
    
}

export default Login