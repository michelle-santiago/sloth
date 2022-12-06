import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { signupFields } from "../constants/formFields"
import { signUp } from '../api/api';
import { NavLink } from 'react-router-dom';

const fields = signupFields;
let fieldsState = {};
fields.forEach(field  => fieldsState[field.id] = '');

const SignUp = () => {
    const navigate = useNavigate();
    const [ registerState, setRegisterState ] = useState(fieldsState);

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp({
            email: registerState.emailAddress,
            password: registerState.password,
            password_confirmation: registerState.confirmPassword,
        })
			.then(res => {
				navigate("/login");
			}).catch(err => {
				console.log(err.response.data.errors.full_messages)
			})
    }

    const handleChange = (e) => {
      setRegisterState({...registerState, [e.target.id] : e.target.value})
    }

    return (
     <>
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 z-9">
            <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
                <h1 className="">Create your slack account</h1>
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        {fields.map(field =>
                        <>
                            <label htmlFor={field.labelFor} className="block text-sm font-semibold leading-6 text-gray-900">
                                {field.labelText}
                            </label>
                            <input
                                onChange={handleChange}
                                value={registerState[field.id]}
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
                        Sign Up
                    </button>
                    <div className="pt-5 space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4">
                        <p className="text-center sm:text-left">Already have an account?</p>
                        <NavLink  to="/login"  className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
                            Login
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
    
}

export default SignUp