import React from 'react'

const timeFormat = (dateData) => {
    const currentDate =new Date(dateData); 
    const time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(currentDate);
    //console.log( "time",time)
    return time;
}

export default timeFormat