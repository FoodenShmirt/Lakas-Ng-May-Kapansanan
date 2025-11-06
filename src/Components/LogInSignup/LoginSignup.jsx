import React, { act, useEffect, useState } from 'react'
import './LoginSignup.css'
import Image from '../Assets/logo.png';


export const LoginSignup = () => {
  
  useEffect(()=>{
    document.title = ("Log In")
  },[]);

  const [action, setAction] = useState("LOG IN");
  return (      
    <>
    <div className="bg_logo">
      <img src={Image} alt=""></img>
    </div>
    
    <div className="container">
        <div className="header">
         <div className="text"><h2>{action}</h2></div> 
        </div>

        <div className="inputs">
            {action==="SIGN UP"?<div></div>: 
            <div className="input">
            <input type="text" name="username" placeholder='Username' />
            </div>
          }
            {action==="SIGN UP"?<div></div>: 
            <div className="input">
            <input type="password" name="password" placeholder='Password' />
            </div>
          }
          {action==="LOG IN"?<div></div>: 
            <div className="input">
            <input type="text" name="First Name" placeholder='First Name' />
            </div>
          }
          {action==="LOG IN"?<div></div>:    
            <div className="input">
            <input type="password" name="Middle Name" placeholder='Middle Name' />
            </div>
          }
          {action==="LOG IN"?<div></div>:    
            <div className="input">
            <input type="text" name="Last Name" placeholder='Last Name' />
            </div>
          }
          {action==="LOG IN"?<div></div>:    
            <div className="input">
            <input type="password" name="Email Address" placeholder='Email Address' />
            </div>
          }
          {action==="LOG IN"?<div></div>:    
            <div className="input">
            <input type="password" name="Contact Number" placeholder='Contact Number' />
            </div>
          }

          <div className="submit-container">
            <div className={action==="LOG IN"?"submit gray":"submit"} onClick={()=>{setAction("SIGN UP")}}>Sign Up</div>
            <div className={action==="SIGN UP"?"submit gray":"submit"} onClick={()=>{setAction("LOG IN")}}>Log In</div>
          </div>

            <div className="forgotPw">
            <button type="button" class="forgotPw-btn">Forgot Password?</button>
          </div>
        </div>
      </div>
      </>
  )
}
