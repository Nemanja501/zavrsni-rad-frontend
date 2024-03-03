import React, { useContext, useEffect, useState } from 'react'
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../contexts/tokenContext';

const defaultData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms_and_conditions: ''
}
function Register() {
  const [newUser, setNewUser] = useState(defaultData);
  const [isChekced, setIsChecked] = useState(false);
  const [errors, setErrors] = useState(defaultData);
  const {token, setToken} = useContext(tokenContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(isChekced){
      setNewUser({...newUser, terms_and_conditions: 'on'});
    }else{
      setNewUser({...newUser, terms_and_conditions: ''});
    }
  }, [isChekced])

  async function handleSubmit(){
    try{
      const data = await AuthService.register(newUser);
      if(data.token){
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate("/");
      }
    }catch(err){
      setNewUser(defaultData);
      setIsChecked(false);
      console.log(err.response.data.errors);
      if(err.response.data.errors){
        const _errors = err.response.data.errors;
        setErrors({
          first_name: _errors?.first_name || '',
          last_name: _errors?.last_name || '',
          email: _errors?.email || '',
          password: _errors?.password || '',
          password_confirmation: _errors?.password_confirmation || '',
          terms_and_conditions: _errors?.terms_and_conditions || ''
        });
      }
    }
  }


  return (
    <form>
      <h1>Register</h1>
      <div className="mb-3">
        <label className="form-label">First name</label>
        <input type="text" className="form-control" value={newUser.first_name} onChange={(e) =>{ setNewUser({...newUser, first_name: e.target.value}); setErrors(defaultData) }}/>
        {errors.first_name && <div className="alert alert-danger mt-3" role="alert">{errors.first_name}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Last name</label>
        <input type="text" className="form-control" value={newUser.last_name} onChange={(e) =>{ setNewUser({...newUser, last_name: e.target.value}); setErrors(defaultData) }}/>
        {errors.last_name && <div className="alert alert-danger mt-3" role="alert">{errors.last_name}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control" value={newUser.email} onChange={(e) =>{ setNewUser({...newUser, email: e.target.value}); setErrors(defaultData) }}/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        {errors.email && <div className="alert alert-danger mt-3" role="alert">{errors.email}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" value={newUser.password} onChange={(e) =>{ setNewUser({...newUser, password: e.target.value}); setErrors(defaultData) }}/>
        {errors.password && <div className="alert alert-danger mt-3" role="alert">{errors.password}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Confirm password</label>
        <input type="password" className="form-control" value={newUser.password_confirmation} onChange={(e) =>{ setNewUser({...newUser, password_confirmation: e.target.value}); setErrors(defaultData) }}/>
        {errors.password_confirmation && <div className="alert alert-danger mt-3" role="alert">{errors.password_confirmation}</div>}
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" checked={isChekced} onChange={(e) =>{ 
          setIsChecked(isChekced => !isChekced);
          setErrors(defaultData);
          }}/>
        <label className="form-check-label">I accept terms and conditions</label>
        {errors.terms_and_conditions && <div className="alert alert-danger mt-3" role="alert">{errors.terms_and_conditions}</div>}
      </div>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>Register</button>
     </form>
  )
}

export default Register