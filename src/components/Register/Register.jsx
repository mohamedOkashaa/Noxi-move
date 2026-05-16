import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);

  // User state with all required fields
  let [user, setUser] = useState({
    "name": "",
    "email": "",
    "password": "",
    "rePassword": "",
    "phone": ""
  })

  // Error message returned from the API
  let [errorMsgApi, seterrorMsgApi] = useState('');
  // Validation errors object from Joi { fieldName: 'error message' }
  let [errorList, setErroList] = useState({});
  // Controls the loading spinner on the submit button
  let [loading, setLoading] = useState(false);

  // Updates the user state on every input change
  function getFormValue(e) {
    let myUser = { ...user } // Shallow copy to avoid mutating state directly
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
  }

  const navigate = useNavigate();

  // Redirects to the Login page after successful registration
  function goToLogin() {
    navigate(`/Login`)
  }

  // Handles form submission: validates → sends to API → navigates or shows error
  async function SubmitFormData(e) {
    e.preventDefault();
    setLoading(true);

    let validationResponse = validationForm()

    if (validationResponse.error) {
      // Map Joi error details into { fieldName: message } object
      let errors = {};
      validationResponse.error.details.forEach(error => {
        errors[error.path[0]] = error.message;
      });
      if (!user.rePassword) {
        errors.rePassword = 'Please confirm your password';
      } else if (user.rePassword !== user.password) {
        errors.rePassword = 'Passwords do not match';
      }
      setErroList(errors);
    } else {
      try {
        // Send registration data to the API
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', user);
        if (data.message === 'success') {
          goToLogin() // Redirect to login on success
        }
      } catch (error) {
        // Show API error message and clear any old validation errors
        seterrorMsgApi(error.response.data.message);
        setErroList({});
      }
    }
    setLoading(false);
  }

  // Joi schema validation for all form fields
  function validationForm() {
    const schema = Joi.object({
      name: Joi.string()
        .pattern(/^[a-zA-Z]+( [a-zA-Z]+){0,2}$/)
        .min(3)
        .max(13)
        .required()
        .messages({
          'string.empty': 'Name is required',
          'string.pattern.base': 'Name must contain letters and spaces only (max 2 spaces)',
          'string.min': 'Name must be at least 3 characters',
          'string.max': 'Name must be at most 13 characters',
          'any.required': 'Name is required',
        }),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          'string.empty': 'Email is required',
          'string.email': 'Email is not valid',
          'any.required': 'Email is required',
        }),

      password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{5,10}$/)
        .required()
        .messages({
          'string.empty': 'Password is required',
          'string.pattern.base': 'Password must contain: 1 uppercase, 1 lowercase, 1 special character, and be 6-10 characters',
          'any.required': 'Password is required',
        }),

      // Must match the password field exactly
      rePassword: Joi.string()
        .required()
        .messages({
          'string.empty': 'Please confirm your password',
          'any.required': 'Please confirm your password',
        }),


      // Egyptian phone numbers only: 010, 011, 012 followed by 8 digits
      phone: Joi.string()
        .pattern(/^01[0-2]\d{8}$/)
        .required()
        .messages({
          'string.empty': 'Phone is required',
          'string.pattern.base': 'Enter a valid Egyptian number',
          'any.required': 'Phone is required',
        }),
    });

    // abortEarly: false → collect all errors at once instead of stopping at first
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      <div className='w-75 m-auto my-4'>
        <h1>Registration Form</h1>

        {/* API error message with custom style */}
        {errorMsgApi && (
          <div className={styles.errorMsg}>
            <div className={styles.errorMsgBar}></div>
            <div className={styles.errorMsgBody}>
              <i className="fa fa-exclamation-triangle"></i>
              <span>{errorMsgApi}</span>
            </div>
          </div>
        )}

        <form className='mt-4' onSubmit={SubmitFormData}>

          {/* Name field */}
          <div className="input-wrapper my-4">
            <label htmlFor="name" className='form-label'>Name: </label>
            <input onChange={getFormValue} type="text" autoComplete='given-name' className='form-control' name='name' id='name' />
            {errorList.name && <p className='text-danger'>{errorList.name}</p>}
          </div>

          {/* Phone field */}
          <div className="input-wrapper my-4">
            <label htmlFor="phone" className='form-label'>Phone: </label>
            <input onChange={getFormValue} type="tel" autoComplete="off" className='form-control' name='phone' id='phone' />
            {errorList.phone && <p className='text-danger'>{errorList.phone}</p>}
          </div>

          {/* Email field */}
          <div className="input-wrapper my-4">
            <label htmlFor="email" className='form-label'>Email: </label>
            <input onChange={getFormValue} type="email" autoComplete="email" className='form-control' name='email' id='email' />
            {errorList.email && <p className='text-danger'>{errorList.email}</p>}
          </div>

          {/* Password field */}
          <div className="input-wrapper my-4 position-relative">
            <label htmlFor="password" className='form-label'>Password: </label>
            <input onChange={getFormValue} type={showPass ? "text" : "password"} autoComplete="new-password" className='form-control' name='password' id='password' />
            <i
              onClick={() => setShowPass(!showPass)}
              className={`fa ${showPass ? 'fa-eye-slash' : 'fa-eye'} position-absolute`}
              style={{ right: '10px', top: '44px', cursor: 'pointer', color: 'black' }}
            ></i>
            {errorList.password && <p className='text-danger'>{errorList.password}</p>}
          </div>

          {/* Confirm password field */}
          <div className="input-wrapper my-4 position-relative">
            <label htmlFor="rePassword" className='form-label'>Confirm Password: </label>
            <input onChange={getFormValue} type={showRePass ? "text" : "password"} autoComplete="new-password" className='form-control' name='rePassword' id='rePassword' />
            <i
              onClick={() => setShowRePass(!showRePass)}
              className={`${styles.eyeIcon} fa ${showRePass ? 'fa-eye-slash' : 'fa-eye'} position-absolute`}
            ></i>
            {errorList.rePassword && <p className='text-danger'>{errorList.rePassword}</p>}
          </div>

          {/* Submit button — shows spinner while loading */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-info" type="submit">
              {loading ? <i className='fa fa-spinner fa-spin'></i> : 'Register'}
            </button>
          </div>

        </form>
      </div>
    </>
  )
}