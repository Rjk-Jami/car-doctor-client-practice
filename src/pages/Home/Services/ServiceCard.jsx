import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {
    const {description,img,price,title,_id,service_id,facility} =service
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={img} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body  ">
                    <h2 className="card-title">{title}</h2> 
                    <div className="w-full flex items-center justify-between">
                    <p className='text-orange-500 font-bold'>Price: {price}</p>
                     <Link to={`/book/${_id}`}><FaArrowRight className='fill-orange-500'></FaArrowRight></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;