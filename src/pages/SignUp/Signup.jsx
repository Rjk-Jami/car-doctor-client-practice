import React, { useContext } from 'react';
import img from "../../assets/images/login/login.svg"
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Signup = () => {
    const {createUser} = useContext(AuthContext)
    const handleSignUp = event =>{
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        createUser(email, password)
        .then(result=>{
            const loggedUser = result.user
            console.log(loggedUser)
            form.reset()
        })
        .then(error=>{
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
                        <h1 className="text-5xl font-bold text-center mt-3">Sign up</h1>
                        <form onSubmit={handleSignUp} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className="input input-bordered" />
                            </div>
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
                                
                            </div>
                            <div className="form-control mt-6">

                                <input type="submit" value="Sign up" className="btn btn-primary" />
                            </div>
                        </form>
                        <div className="  ">
                            <SocialLogin></SocialLogin>
                            <p className='text-center mb-5'>Have an account? <Link to="/login" className='text-orange-500 font-bold'>Login</Link> </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;