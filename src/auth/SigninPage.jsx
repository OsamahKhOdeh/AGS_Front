import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import styled from "styled-components";
function SigninPage() {
  const SigninPage = styled.div`
    @import url("https://fonts.googleapis.com/css?family=Raleway:400,700");
    display: grid;
    place-items: center;
    place-content: center;
    .login {
      margin: 20px auto;
      padding: 40px 50px;
      max-width: 500px;
      border-radius: 5px;
      background: #fff;
      display: grid;
      place-content: center;
    }
    .login input {
      width: 100%;
      display: block;
      box-sizing: border-box;
      margin: 10px 0;
      padding: 14px 12px;
      font-size: 16px;
      border-radius: 2px;
      font-family: Raleway, sans-serif;
    }

    .login input[type="text"],
    .login input[type="password"] {
      border: 1px solid #c0c0c0;
      transition: 0.2s;
    }

    .login input[type="text"]:hover {
      border-color: #f44336;
      outline: none;
      transition: all 0.2s ease-in-out;
    }

    .login .submit {
      border: none;
      background: #ef5350;
      color: white;
      font-weight: bold;
      transition: 0.2s;
      margin: 20px 0px;
      cursor: pointer;
      display: grid;
      place-items: center;
      place-content: center;
      text-align: center;
    }

    .login .submit:hover {
      background: #f44336;
    }

    .login h2 {
      margin: 20px 0 0;
      color: #ef5350;
      font-size: 28px;
    }

    .login p {
      margin-bottom: 40px;
    }

    .links {
      display: table;
      width: 100%;
      box-sizing: border-box;
      border-top: 1px solid #c0c0c0;
      margin-bottom: 10px;
    }

    .links a {
      display: table-cell;
      padding-top: 10px;
    }

    .links a:first-child {
      text-align: left;
    }

    .links a:last-child {
      text-align: right;
    }

    .login h2,
    .login p,
    .login a {
      text-align: center;
    }

    .login a {
      text-decoration: none;
      font-size: 0.8em;
    }

    .login a:visited {
      color: inherit;
    }

    .login a:hover {
      text-decoration: underline;
    }

    .login > img {
      height: auto;
    }
  `;

  const navigate = useNavigate();
  const psswd = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (psswd.current.value === "") {
      alert("the value is empty");
    } else {
      if (psswd.current.value === "1234567") {
        navigate("/editprice");
      } else {
        alert("the password is not correct ");
      }
    }
  };

  return (
    <SigninPage>
      <form className='login' onSubmit={handleSubmit}>
        <img src='/images/logo.png' alt='' srcset='' />
        <p>Please log in</p>
        <input type='text' placeholder='User Name' />
        <input type='password' placeholder='Password' ref={psswd} />
        <input className='submit' type='submit' value='Log In' />
        <div className='links'>
          <a href='#'>Forgot password</a>
          <a href='#'>Register</a>
        </div>
      </form>
    </SigninPage>
  );
}

export default SigninPage;
