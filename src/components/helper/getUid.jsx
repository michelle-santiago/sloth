
//gives the email of user (Uid)
const getUid = (users, id) => {

    if(users){
        const usersResult = users.find((user) => {
            if(user.id === id){
                return user
            }
        })
        return usersResult.uid
    } 
}

export default getUid