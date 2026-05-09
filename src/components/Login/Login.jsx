import React, { useState } from 'react'
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';


export default function Login(props) {
  // USer Data
  let [user, setUser] = useState({
    "email": "",
    "password": ""
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
  function goToHome() {
    navigate(`/Home`)
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
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', user);
        if (data.message === 'success') {
          localStorage.setItem('user', data.token);
          props.saveUserData();
          goToHome()
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
      email: Joi.string().email().required(),
      password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{5,10}$/).required()
        .messages({
          'string.pattern.base': 'Password must contain: 1 uppercase, 1 lowercase, 1 special character, and be 6-10 characters'
        }),
    });
    return schema.validate(user, { abortEarly: false });
  }


  return (
    <>
      <div className='w-75 m-auto my-4'>
        <h1>Login Form</h1>
        {/* Validation Errors */}
        {errorList?.map((error, index) => <div key={index} className='alert-danger alert'>{error.message}</div>)}
        {/* BackEnd Error */}
        {errorMsgApi ? <div className='alert-danger alert'>{errorMsgApi}</div> : ''}

        <form className='mt-4' onSubmit={SubmitFormData}>

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

          {/* Submit Button */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-info" type="submit">
              {loading ? <i className='fa fa-spinner fa-spin'></i> : 'Login'}
            </button>
          </div>

        </form>
      </div>
    </>
  )
}
