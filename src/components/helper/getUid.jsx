import React,{ useContext } from 'react'
import { UserContext } from '../../hooks/UserContext';
const getUid = (id) => {
    const { users  } = useContext(UserContext);
    if(users){
        const usersResult= users.find((user) => {
            if(user.id===id){
                return user
            }
        })
        return usersResult.uid
    } 
}

export default getUid