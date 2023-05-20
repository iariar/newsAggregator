import './signUp.css';
import React, { useRef, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios-client';
import { withRouter } from 'react-router-dom';

const SignupPage = () => {
    const [isSignup, setIsSignup] = useState(true)
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const {setUser, setToken} =  useStateContext()
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate();

    const onsubmitsign =  () => {
      const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      }
      
        axiosClient.post('signup', payload)
        .then((response) => {
          setUser(response.data.user)
          setToken(response.data.token)
          navigate('/dashboard');
          
        }
        ).catch((err) => {
          const response  = err.response;
          if(response && response.status === 422)
          {
            setErrors(response.data.errors)
          }
        })
      
    }
    const onsubmitlog = () => {
      const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value
      }
      setErrors(null)
      axiosClient.post('login', payload)
      .then((response) => {
        setUser(response.data.user)
        setToken(response.data.token)
        navigate('/dashboard');
        
      }
      ).catch((err) => {
        const response  = err.response;
          if(response && response.status === 422)
          {
            if (response.data.errorss)
             setErrors(response.data.errors)
            else {
              setErrors({
                email: [response.data.message]
              })
          }
          }
      })

    }
  return (
    <div className="signup-page">
      <div className="image-section">
        <img src="../../utils/d773265730da159098d1b48b8714df7f.webp" alt="Signup" />
      </div>
      {isSignup ? 
      <div className="form-section">
        <h2 className='welcome'>Welcome To your News Portal</h2>
        <h3 className='continue' >Sign Up to Continue.</h3>
        <div className='secondary-container'>
          {
            errors && <div className='alert'>
              
              {Object.keys(errors).map(key => 
                <p key={key}>{errors[key][0]}</p>
                )}
            </div>
          }
            <form>
              <div className="form-group">
                <input ref={nameRef} className='signup-input' type="text" id="name" placeholder="Name"/>
              </div>
              <div className="form-group">
                <input ref={emailRef} className='signup-input' type="email" id="email" placeholder="Email"/>
              </div>
              <div className="form-group">
                <input ref={passwordRef} className='signup-input' type="password" id="password" placeholder="Password"/>
              </div>
              <span className='sign-button' onClick={onsubmitsign}>Sign Up</span>
            </form>
            <h4 className='smaller-title'>Already have an account? <span className='link-span' onClick={() => setIsSignup(false)}>Login</span></h4>
        </div>
      </div> 
      : 
      <div className="form-section">
        <h2 className='welcome'>Welcome To your News Portal, Login to Continue.</h2>
        <div className='secondary-container'>
        {
            errors && <div className='alert'>
              
              {Object.keys(errors).map(key => 
                <p key={key}>{errors[key][0]}</p>
                )}
            </div>
          }
        <form>
          <div className="form-group">
            <input ref={emailRef} className='signup-input' type="email" id="email" placeholder="Email"/>
          </div>
          <div className="form-group">
            <input ref={passwordRef} className='signup-input' type="password" id="password" placeholder="Password"/>
          </div>
          <span className='sign-button' type="submit" onClick={onsubmitlog}>Login</span>
        </form>
        <h4 className='smaller-title'>Don't Have an Account? <span className='link-span' onClick={() => setIsSignup(true)}>Signup</span></h4>
        </div>
      </div> 
      }
    </div>
  );
};

export default SignupPage;