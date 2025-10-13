import React from 'react'
import './Login.css'
function Login() {
  return (
    <>
        <div className="loginPage">
              <form action="login">
            <div className="centerBox">
              
                  <span className="titleText">L o g i n</span>
                  <div className="wrapping"><label htmlFor="username">Username</label></div>
                  <input type="text" name='username' className='login input'/>
                  <div className="wrapping"><label htmlFor="username">Password</label></div>
                  <input type="text" className='login input'/>
                  <button type="submit" className='submitBtn'>Submit</button>

            </div>
            </form>
        </div>
    </>
  )
}

export default Login