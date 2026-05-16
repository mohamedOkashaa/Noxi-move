import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'


export default function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  let [user, setUser] = useState({
    "email": "",
    "password": ""
  })
  let [errorMsgApi, seterrorMsgApi] = useState('');
  let [errorList, setErroList] = useState({});
  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/home');
    }
    // eslint-disable-next-line
  }, []);

  function getFormValue(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
  }



  async function SubmitFormData(e) {
    e.preventDefault();
    setLoading(true);
    let validationResponse = validationForm()
    if (validationResponse.error) {
      let errors = {};
      validationResponse.error.details.forEach(error => {
        errors[error.path[0]] = error.message;
      });
      setErroList(errors);

    } else {
      try {
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', user);
        if (data.message === 'success') {
          localStorage.setItem('user', data.token);
          props.saveUserData();
          navigate('/home')
        }
      } catch (error) {
        seterrorMsgApi(error.response.data.message);

        setErroList({});
      }
    }
    setLoading(false);
  }

  function validationForm() {
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          'string.empty': 'Email is required',
          'string.email': 'Email is not valid',
          'any.required': 'Email is required',
        }),

      password: Joi.string()
        .required()
        .messages({
          'string.empty': 'Password is required',
          'string.pattern.base': '000',
          'any.required': 'Password is required',
        }),
    });

    return schema.validate(user, { abortEarly: false });
  }


  return (
    <>
      <div className='w-75 m-auto my-4'>
        <h1>Login Form</h1>

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

          <div className="input-wrapper my-4">
            <label htmlFor="email" className='form-label'>Email : </label>
            <input onChange={getFormValue} type="email" autoComplete="email" className='form-control' name='email' id='email' />
            {/* email input */}
            {errorList.email && <p className='text-danger mt-1'>{errorList.email}</p>}
          </div>

          <div className="input-wrapper my-4 position-relative">
            <label htmlFor="password" className='form-label'>Password : </label>
            <input onChange={getFormValue} type={showPassword ? "text" : "password"} autoComplete="new-password" className='form-control' name='password' id='password' />
            <i
              onClick={() => setShowPassword(!showPassword)}
              className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute`}
              style={{ right: '10px', top: '44px', cursor: 'pointer', color: 'black' }}
            ></i>
            {/* password input */}
            {errorList.password && <p className='text-danger mt-1'>{errorList.password}</p>}
          </div>

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