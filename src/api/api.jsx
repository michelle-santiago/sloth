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

export const retrieveMsg= async (data,id,type) => {
    const config = { method: "GET", headers: { "Content-Type": "application/json", ...data }};
    const res = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${id}&receiver_class=${type}`, config)
    return await res.json()
}
export const retrieveUsers = async (data) => {
    const config = { method: "GET", headers: { "Content-Type": "application/json", ...data }};
    const res = await fetch('http://206.189.91.54/api/v1/users', config)

    return await res.json()
}

export const sendMessage = async ({ data, receiver_id, receiver_class, body }) => {
    return await axios.post('http://206.189.91.54/api/v1/messages', 
        {receiver_id, receiver_class, body},{ headers: data }
    )
}