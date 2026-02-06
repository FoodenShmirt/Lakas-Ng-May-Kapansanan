import { useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import './LoginSignup.css'
import Image from '../Assets/logo.png';

export const LoginSignup = () => {

  const [pageTitle, setPageTitle] = useState("Log In");
  const [action, setAction] = useState("LOG IN");

  /* form  */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  // MUST BE ON TOP //

const navigate = useNavigate();
  
const API_URL = "https://lakas-ng-may-kapansanan.onrender.com"; 

//login function
const handleLogIn = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } else {
      alert(data.message);
    }

  } catch (err) {
    console.error("Login failed:", err);
    alert("Server error. Please try again.");
    }
  };

//sign up
 const handleSignUp = async (e) => {
  e.preventDefault();

  try {
    const API_URL = "https://lakas-ng-may-kapansanan.onrender.com"; 
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        firstname,
        middlename,
        lastname,
        email,
        contact,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created successfully! You can now log in.");
      setAction("LOG IN");
      setPageTitle("Log In");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Signup failed:", err);
    alert("Server error. Please try again.");
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          }

          {/* SIGN UP FIELDS */}
          {action === "LOG IN" ? null :
  <>
    <div className="input">
      <input 
        type="text" 
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>

    <div className="input">
      <input 
        type="password" 
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div className="input">
      <input 
        type="text" 
        placeholder='First Name'
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
    </div>

    <div className="input">
      <input 
        type="text" 
        placeholder='Middle Name'
        value={middlename}
        onChange={(e) => setMiddlename(e.target.value)}
      />
    </div>

    <div className="input">
      <input 
        type="text" 
        placeholder='Last Name'
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
    </div>

    <div className="input">
      <input 
        type="email" 
        placeholder='Email Address'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="input">
      <input 
        type="text" 
        placeholder='Contact Number'
        maxLength={11}
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        
      />
    </div>
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


          {/* SIGN UP BUTTON ON SIGN UP PAGE*/}
          {action === "SIGN UP" && (
            <div className="submitcontainer_sgn">
              <button className="submit_sgn" onClick={handleSignUp}>
                Sign Up
              </button>
              <button
                className="forgotPw-btn"
                onClick={() => {
                  setAction("LOG IN");
                  setPageTitle("Log In");
                }}
              >
                Already have an account?
              </button>
            </div>
          )}

          {/* FORGOT PASSWORD */}
          {action === "SIGN UP" ? null :
            <div className="forgotPw">
              <button type="button" className="forgotPw-btn">Forgot Password?</button>
            </div>
          }       
        </div>
      </div>
      
    </>
  );
};