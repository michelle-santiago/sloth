const loginFields = [
    {
        labelText: "Email address",
        labelFor: "email-address",
        id: "emailAddress",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address"   
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password"   
    },
]

const signupFields = [
    {
        labelText: "Email Address",
        labelFor: "email-address",
        id: "emailAddress",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email Address"   
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password"   
    },
    {
        labelText: "Confirm Password",
        labelFor: "password",
        id: "confirmPassword",
        name: "password",
        type: "password",
        autoComplete: "confirm-password",
        isRequired: true,
        placeholder: "Confirm Password"   
    },
]
export { loginFields, signupFields }