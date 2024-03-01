import React, { useState } from 'react'
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const defaultData = {
  email: '',
  password: ''
}
function Login() {
  const [user, setUser]= useState(defaultData);
  const [errors, setErrors] = useState(defaultData);
  const navigate = useNavigate();

  async function handleSubmit(){
    try{
      const data = await AuthService.login(user);
      if(data.token){
        localStorage.setItem('token', data.token);
        navigate("/");
        window.location.reload();
      }
      if(data.error){
        setErrors({
          ...errors,
          message: data.error
        })
      }
    }catch(err){
      setUser(defaultData);
      if(err.response.data.errors){
        const _errors = err.response.data.errors;
        setErrors({
          email: _errors?.email || '',
          password: _errors?.password || ''
        });
      }
      if(err.error){
        setErrors({
          ...errors,
          message: err.error
        });
      }
    }
  }

  return (
    <form>
    <h1>Login</h1>
    <div className="mb-3">
      <label className="form-label">Email address</label>
      <input type="email" className="form-control" value={user.email} onChange={(e) =>{ setUser({...user, email: e.target.value}); setErrors(defaultData) }}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      {errors.email && <div className="alert alert-danger mt-3" role="alert">{errors.email}</div>}
    </div>
    <div className="mb-3">
      <label className="form-label">Password</label>
      <input type="password" className="form-control" value={user.password} onChange={(e) =>{ setUser({...user, password: e.target.value}); setErrors(defaultData) }}/>
      {errors.password && <div className="alert alert-danger mt-3" role="alert">{errors.password}</div>}
    </div>
    {errors.message && <div className="alert alert-danger mt-3" role="alert">{errors.message}</div>}
    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Login</button>
   </form>
  )
}

export default Login