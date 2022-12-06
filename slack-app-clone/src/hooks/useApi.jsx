import useProfile from './useUserApi';
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
        alert(data.errors[0])
    }else{
        sessionStorage.setItem("loggedInUserAuth", JSON.stringify(headers));
        alert("Login Successful")
        navigate("/chat")
    }
  })
}
const sign_up=(email, password)=>{

  fetch(`${url}/auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
        password: password,
  
    }),
  })

  .then((res) => {
    console.log(res)
    return res.json()
    })

  .then((data) => {
    console.log(data)
    if(data.status==="error"){
      alert(data.errors.full_messages)
    }else{
      alert("Sign Up Successful")
    }
  })
}
export {
   sign_in,
   sign_up
};