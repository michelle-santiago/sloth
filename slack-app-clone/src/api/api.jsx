import axios from 'axios';

export const signUp = async ({ email, password, password_confirmation }) => {
    return await axios.post('http://206.189.91.54/api/v1/auth/', { email, password, password_confirmation })
}

export const signIn = async ({ email, password }) => {
    return await axios.post('http://206.189.91.54/api/v1/auth/sign_in', {
         email, password 
    })
}

export const retrieveChannels = async (data) => {
    const config = { method: "GET", headers: { "Content-Type": "application/json", ...data }};
    const res = await fetch('http://206.189.91.54/api/v1/channels', config)

    return await res.json()
}

export const retrieveDirectMsg= async (data,id,type) => {
    console.log("data: ",data)
    const config = { method: "GET", headers: { "Content-Type": "application/json", ...data }};
    const res = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=2966&receiver_class=${type}`, config)
    console.log("res",res)
    return await res.json()
}