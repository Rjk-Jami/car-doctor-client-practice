import React, { useContext } from 'react';
import img from "../../assets/images/login/login.svg"

import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const {login, loginWithGoogle} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    
    const handleLogin = event =>{
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        login(email,password)
        .then(result=>{
            const user = result.user
            form.reset()
            navigate(from, { replace: true })
            
            

        })
        .catch(error=>{
            console.log(error)
        })      
    }
    return (
        <div className='my-7'>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center mr-16 lg:text-left w-1/2">
                        <img src={img} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-5xl font-bold text-center mt-3">Login</h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                             
                                <input type="submit" value="Login" className="btn btn-primary" />
                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                        <p className='text-center mb-5'>Don't have an account? <Link to="/signUp" className='text-orange-500 font-bold'>Sign up</Link> </p> 
    
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;