import React, { useEffect, useState } from "react"; 
 
const Timer = ({timer,setTimer}) => { 
  useEffect(() => { 
    const interval = setInterval(() => { 
      if (timer > 0) { 
        setTimer((prevState) => prevState - 1); 
      } 
    }, 1000); 
    return () => clearInterval(interval); 
  }, [timer]); 
  return (
    <div>Resend OTP in : {timer > 9 ? `00:${timer}` : `00:0${timer}`}</div>
  )
    
}; 
 
export default Timer;