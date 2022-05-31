import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    setMessage("");
    setSuccessful(false);

    AuthService.register(
      data.firstname,
      data.lastname,
      data.username,
      data.email,
      data.password,
      data.birthdate
    ).then(
      (response) => {
        setSuccessful(true);
        setMessage(response.data.message);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <form className="pure-form pure-form-aligned">
      <fieldset>
        <div className="pure-control-group">
          <label htmlFor="fistname">Firstname*</label>
          <input
            type="text"
            id="fistname"
            placeholder="Firstname"
            {...register("firstname", {
              required: true,
              minLength: 2,
              maxLength: 20,
            })}
          />
        </div>
        <div className="pure-control-group">
          <label for="lastname">Lastname*</label>
          <input
            type="text"
            id="lastname"
            placeholder="Lastname"
            {...register("lastname")}
          />
        </div>
        <div className="pure-control-group">
          <label for="date">Birthdate*</label>
          <input type="date" id="date" {...register("birthdate")} />
        </div>
        <div className="pure-control-group">
          <label for="street">Street*</label>
          <input
            type="text"
            id="street"
            placeholder="Street"
            {...register("street")}
          />
        </div>
        <div className="pure-control-group">
          <label for="number">Housenumber*</label>
          <input
            type="number"
            id="number"
            placeholder="Number"
            {...register("number")}
          />
        </div>
        <div className="pure-control-group">
          <label for="city">City*</label>
          <input
            type="text"
            id="city"
            placeholder="City"
            {...register("city")}
          />
        </div>
        <div className="pure-control-group">
          <label for="email">Email Address*</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            {...register("email")}
          />
        </div>
        <div className="pure-control-group">
          <label for="phonenumber">Phone</label>
          <input
            type="text"
            id="phonenumber"
            placeholder="Homedigits"
            {...register("phonenumber")}
          />
        </div>
        <div className="pure-control-group">
          <label for="mobilenumber">Mobile</label>
          <input
            type="text"
            id="mobilenumber"
            placeholder="Mobiledigits"
            {...register("mobilenumber")}
          />
        </div>
        <div className="pure-controls">
          <button
            className="pure-button pure-button-primary"
            onClick={handleRegister}
          >
            Submit
          </button>
        </div>
      </fieldset>
      {message && <p>{message}</p>}
    </form>
  );
}
