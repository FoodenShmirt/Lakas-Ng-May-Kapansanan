import { useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import './LoginSignup.css'
import Image from '../Assets/logo.png';

export const LoginSignup = () => {

  const [pageTitle, setPageTitle] = useState("Log In");
  const [action, setAction] = useState("LOG IN");

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  // MUST BE ON TOP //
  const [username, setUsername] = useState("");
  const [pw, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault(); 

  if (username === "admin" && pw === "admin") {
    localStorage.setItem("loggedIn", "true");
    navigate("/dashboard");
  } else {
      alert("The password or username you've entered is incorrect.");
    }
  };

  return (
    <>
      <div className="bg_logo">
        <img src={Image} alt="" />
      </div>

      <div className="container">
        <div className="header">
          <div className="text"><h2>{action}</h2></div>
        </div>

        <div className="inputs">
          {action === "SIGN UP" ? null :
            <div className="input">
              <input 
                type="text" 
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          }

          {action === "SIGN UP" ? null :
            <div className="input">
              <input 
                type="password" 
                placeholder='Password'
                value={pw}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          }

          {/* SIGN UP FIELDS */}
          {action === "LOG IN" ? null :
            <>
              <div className="input"><input type="text" placeholder='First Name' /></div>
              <div className="input"><input type="text" placeholder='Middle Name' /></div>
              <div className="input"><input type="text" placeholder='Last Name' /></div>
              <div className="input"><input type="email" placeholder='Email Address' /></div>
              <div className="input"><input type="text" placeholder='Contact Number' maxLength={11} /></div>
            </>
          }

          {/* BUTTONS */}
          {action === "SIGN UP" ? null : (
          <div className="submit-container">

            <button
              className={action === "LOG IN" ? "submit signup" : "submit signup gray"}
              onClick={() => { 
                setAction("SIGN UP"); 
                setPageTitle("Sign Up"); }}>
              Sign Up
            </button>

            <button
              className={action === "SIGN UP" ? "submit login gray" : "submit login"}
              onClick={handleLogIn} >
              Log In
            </button>
          </div>
        )}


          {/* SIGN UP ONLY BUTTON */}
          {action === "LOG IN" ? null :
            <div className="submitcontainer_sgn">
              <button
                className="submit_sgn" 
                onClick={() => { setAction("SIGN UP") }}>
                Sign Up
              </button>
            </div>
          }

          {/* FORGOT PASSWORD */}
          {action === "SIGN UP" ? null :
            <div className="forgotPw">
              <button type="button" className="forgotPw-btn">Forgot Password?</button>
            </div>
          }

          {/* ALREADY HAVE ACCOUNT */}
          {action === "LOG IN" ? null :
            <div className="forgotPw">
              <button 
                type="button" 
                className="forgotPw-btn" 
                onClick={() => { setAction("LOG IN"); setPageTitle("Log In"); }}>
                Already have an account?
              </button>
            </div>
          }
          
        </div>
      </div>
    </>
  );
};