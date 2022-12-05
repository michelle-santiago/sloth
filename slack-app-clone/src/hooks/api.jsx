import React from 'react'
const url = 'http://206.189.91.54/api/v1'
const sign_in = (email, password) => {

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
           const headers={
              'access-token': res.headers.get('access-token'),
              'client': res.headers.get('client'),
              'expiry': res.headers.get('expiry'),
              'uid': res.headers.get('uid'),
            }
            console.log("headers",headers)
            return res.json()
          })
          .then((data) => {
            console.log(data)
          })
}

export {
   sign_in
};