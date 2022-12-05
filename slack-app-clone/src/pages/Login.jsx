import React, { useEffect, useState } from 'react'
import { loginFields } from "../constants/formFields"
import { sign_in } from '../hooks/useApi';
import { useNavigate } from "react-router-dom";
const fields = loginFields;
let fieldsState = {};
fields.forEach(field  => fieldsState[field.id] = '');

const Login = () => {
    const [ loginState, setLoginState ] = useState(fieldsState);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        sign_in(loginState.emailAddress, loginState.password,navigate);
    }

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
                        {fields.map(field =>
                        <>
                            <label htmlFor={field.labelFor} className="block text-sm font-semibold leading-6 text-gray-900">
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
                        </>
                        )}
                    </div>
                    <button type="submit" className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full" onSubmit={ handleSubmit }>
                        Login
                    </button>
                    
                </form>
            </div>
        </div>
    </>
    )
    
}

export default Login