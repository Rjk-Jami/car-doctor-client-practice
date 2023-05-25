import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const location = useLocation()
    const {user, loading} =useContext(AuthContext)
    if(loading){
       return <progress className="progress w-full "></progress>
    }
    if(user?.email){
        return children
    }
    
    return <Navigate to='/login' replace={true} state={{from: location}}/>
};

export default PrivateRoutes;