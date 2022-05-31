import React, { Component, useEffect, useState } from "react";
import authService from "../services/auth.service";
import AuthService from "../services/auth.service";
import { toast, ToastContainer } from 'react-toastify';

export default function Profile(props) {

  const user = props.user;

  useEffect(() => {
    if (!user.passwordChanged)
      toast.warn("Please change your default password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,


      })
  })


  return (

    <div className="container" >
      {user ? <><header className="jumbotron">
        <h3>
          <strong>{user.username}</strong> Profile
        </h3>
      </header>
        <p>
          <strong>Token:</strong> {user.token.substring(0, 20)} ...{" "}
          {user.token.substr(user.token.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {user.id}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {user.roles &&
            user.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </>
        : <h1>No user logged in</h1>
      }
      <ToastContainer />
    </div >

  );
}

