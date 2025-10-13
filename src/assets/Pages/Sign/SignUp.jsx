import React from 'react'
import './SignUp.css'
function SignUp() {
  return (
    <>
        <div className="SignUpPage">
              <form action="login">
            <div className="centerBox">
              
                  <span className="titleText">S i g n U p</span>
                  <div className="wrapping"><label htmlFor="username">Username</label></div>
                  <input type="text" name='username' className='login input'/>
                  <div className="wrapping"><label htmlFor="Email">Email</label></div>
                  <input type="text" className='login input'/>
                    <div className="wrapping"><label htmlFor="password">Password</label></div>
                  <input type="text" className='login input'/>
                  <button type="submit" className='submitBtn'>Submit</button>

            </div>
            </form>
        </div>
    </>
  )
}

export default SignUp