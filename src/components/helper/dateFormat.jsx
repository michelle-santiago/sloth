import React from 'react'

const dateFormat = (dateData) => {
    //console.log("format what",dateData)
    const currentDate =new Date(dateData); 
    const date = new Intl.DateTimeFormat('en-US', { weekday: 'long', /*year: 'numeric',*/ month: 'long', day: 'numeric' }).format(currentDate)
    //console.log("date", date)
    return date;
}

export default dateFormat