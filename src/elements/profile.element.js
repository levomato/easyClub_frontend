import React, { Component } from "react";
import authService from "../services/auth.service";
import AuthService from "../services/auth.service";


export default function Profile(props) {

  const user = authService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
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
    </div>
  );

}
