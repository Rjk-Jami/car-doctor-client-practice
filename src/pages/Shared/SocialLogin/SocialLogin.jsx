import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';

import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
const SocialLogin = () => {
    const {loginWithGoogle} =useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleGoogleLogin =()=>{
        loginWithGoogle()
        .then(result=>{
            const loggedUser = result.loggedUser
            console.log(loggedUser)
            navigate(from, { replace: true })
        })
        .catch(error=>console.log(error))
    }

    return (
        <div className=" space-y-4 mb-5">
                        <p className='divider'>Or Sign In with</p>
                        <div className="flex justify-center gap-5">
                            <button onClick={handleGoogleLogin} className='btn btn-circle p-3'><FaGoogle  ></FaGoogle></button>
                            <FaFacebookF className='btn btn-circle p-3'></FaFacebookF>
                        </div>
                        </div>
    );
};

export default SocialLogin;