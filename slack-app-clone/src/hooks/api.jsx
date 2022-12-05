import React from 'react'
const url = 'http://206.189.91.54/api/v1'
let headers;

const sign_in = (email, password,navigate) => {

        fetch(`${url}/auth/sign_in`, {
        
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password
          }),
        })
          .then((res) => {
          console.log(res)
           headers={
              'access-token': res.headers.get('access-token'),
              'client': res.headers.get('client'),
              'expiry': res.headers.get('expiry'),
              'uid': res.headers.get('uid'),
            }
            console.log("headers",headers)
            return res.json()
          })
          .then((data) => {
            if(data.success===false){
                console.log(data.errors[0])
            }else{
                localStorage.setItem("loggedInUser", JSON.stringify(headers));
                console.log("Login Successful")
                navigate("/chat")
            }
          })
}

export {
   sign_in
};