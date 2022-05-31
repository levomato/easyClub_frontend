import React, { Component } from "react";

import { isEmail } from "validator";
import AuthService from "../services/auth.service";


export default function Register() {

  const [firstname, setFirstName] = useState("");
  const


    constructor(props) {
      super(props);
      this.handleRegister = this.handleRegister.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeBirthdate = this.onChangeBirthdate.bind(this);
      this.onChangeFirstName = this.onChangeFirstName.bind(this);
      this.onChangeLastName = this.onChangeLastName.bind(this);
      this.state = {
        firstname: "",
        lastname: "",
        username: "",
        birthdate: null,
        email: "",
        password: "",
        successful: false,
        message: "",
      };
    }
  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value,
    });
  }
  onChangeBirthdate(e) {
    this.setState({
      birthdate: new Date(e.target.value)
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      console.log(this.state.username);
      AuthService.register(
        this.state.firstname,
        this.state.lastname,
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.birthdate
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }
  render() {
    return (
      <div className="col-md-12">


      </div>
    );
  }
}
