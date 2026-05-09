import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export default function Register() {

  // USer Data
  let [user, setUser] = useState({
    "name": "",
    "email": "",
    "password": "",
    "rePassword": "",
    "phone": ""
  })
  //Error masg from API
  let [errorMsgApi, seterrorMsgApi] = useState('');
  //Validation Errors from Joi
  let [errorList, setErroList] = useState([]);
  //submit button Loading
  let [loading, setLoading] = useState(false);

  //Get value from inputs
  function getFormValue(e) {
    let myUser = { ...user } //Deep Coppy
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
  }

  const navigate = useNavigate();

  //Go to login page
  function goToLogin() {
    navigate(`/Login`)
  }

  //Submit form data to API
  async function SubmitFormData(e) {
    e.preventDefault();
    setLoading(true);

    let validationResponse = validationForm()
    //If validation fails
    
    if (validationResponse.error) {
      setErroList(validationResponse.error.details);
    } else {
      try {
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', user);
        if (data.message === 'success') {
          goToLogin()
        }
      } catch (error) {
        seterrorMsgApi(error.response.data.message);
        setErroList([]); //Clear old validation errors
      }
    }
    setLoading(false);
  }

  //Joi Validation Function
  function validationForm() {
    const schema = Joi.object({
      name: Joi.string().alphanum().required().min(3).max(13),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{5,10}$/).required()
        .messages({
          'string.pattern.base': 'Password must contain: 1 uppercase, 1 lowercase, 1 special character, and be 6-10 characters'
        }),
      rePassword: Joi.string().valid(Joi.ref('password')).required(),
      phone: Joi.string().pattern(/^01[0-2]\d{8}$/).required()
        .messages({
          'string.pattern.base': 'Enter Valid Number'
        }),
    });
    return schema.validate(user, { abortEarly: false });
  }


  return (
    <>
      <div className='w-75 m-auto my-4'>
        <h1>Registration Form</h1>
        {/* Validation Errors */}
        {errorList?.map((error, index) => <div key={index} className='alert-danger alert'>{error.message}</div>)}
        {/* BackEnd Error */}
        {errorMsgApi ? <div className='alert-danger alert'>{errorMsgApi}</div> : ''}

        <form className='mt-4' onSubmit={SubmitFormData}>
          {/* Name Input */}
          <div className=" input-wrapper my-4">
            <label htmlFor="name" className='form-label'>Name : </label>
            <input onChange={getFormValue} type="text" autoComplete='given-name' className='form-control' name='name' id='name' />
          </div>
          {/* Phone Input */}
          <div className="input-wrapper my-4">
            <label htmlFor="phone" className='form-label'>phone : </label>
            <input onChange={getFormValue} type="tel" autoComplete="off" className='form-control' name='phone' id='phone' />
          </div>
          {/* Email Input */}
          <div className="input-wrapper my-4">
            <label htmlFor="email" className='form-label'>Email : </label>
            <input onChange={getFormValue} type="email" autoComplete="email" className='form-control ' name='email' id='email' />
          </div>
          {/* Password Input */}
          <div className="input-wrapper my-4">
            <label htmlFor="password" className='form-label'>Password : </label>
            <input onChange={getFormValue} type="password" autoComplete="new-password" className='form-control ' name='password' id='password' />
          </div>
          {/* Confirm Password Input */}
          <div className="input-wrapper my-4">
            <label htmlFor="rePassword" className='form-label'>Re Password : </label>
            <input onChange={getFormValue} type="password" autoComplete="new-password" className='form-control' name='rePassword' id='rePassword' />
          </div>

          {/* Submit Button */}
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
