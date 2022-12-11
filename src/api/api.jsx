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
    const res= await axios.get('http://206.189.91.54/api/v1/channels', { headers: data })
    return res.data
}

export const retrieveMsg= async (data,id,type) => {
    const res = await  axios.get(`http://206.189.91.54/api/v1/messages?receiver_id=${id}&receiver_class=${type}`, { headers: data })
    return await res.data
}
export const retrieveUsers = async (data) => {
    const res = await axios.get('http://206.189.91.54/api/v1/users', { headers: data })
    return await res.data
}

export const sendMessage = async ({ data, receiver_id, receiver_class, body }) => {
    return await axios.post('http://206.189.91.54/api/v1/messages', 
        {receiver_id, receiver_class, body},{ headers: data }
    )
}

export const createChannel = async ({ data, name, user_ids }) => {
    return await axios.post('http://206.189.91.54/api/v1/channels', 
        { name, user_ids },{ headers: data }
    )
}

export const retrieveChannelDetails= async (data,id) => {
    const res = await axios.get(`http://206.189.91.54/api/v1/channels/${id}`, { headers: data })
    return await res.data
}

export const addMember = async ({ data, id, member_id }) => {
    return await axios.post('http://206.189.91.54/api/v1/channel/add_member', 
        { id, member_id },{ headers: data }
    )
}