
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2'

const BookService = () => {
    const service = useLoaderData()
    const { title, _id, price, img } = service
    const {user} = useContext(AuthContext)
    const handleConfirmOrder = (event)=>{
        event.preventDefault();
        const form = event.target
        const name = form.name.value
        const date = form.date.value
        const phone = form.phone.value
        const email = form.email.value
        const message = form.message.value
        const order = {
            customerName : name,
            email: email,
            phone: phone,
            bookingDate: date,
            message: message,
            service : _id,
            serviceTitle : title,
            image: img,
            price : price
        }
        
        // console.log(order)
        fetch(`https://car-doctor-server-green.vercel.app/bookings`,{
            method:'POST',
            headers :{
                "content-type":"application/json"
            },
            body: JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data =>{
            console.log(data)
            if(data.insertedId){
                Swal.fire(
                    '',
                    'You successfully booked a service!',
                    'success'
                  )
                  form.reset()
            }
        })
    }
    return (
        <div>
            <h2 className='text-4xl text-center font-semibold'>Book Service :{title}</h2>
            <form onSubmit={handleConfirmOrder}>
                <div className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-control">
                        <input type="text" required defaultValue={user?.displayName} name='name' placeholder="Your Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <input type="date" name='date' required placeholder="Last Name" className=" input input-bordered" />
                    </div>
                    <div className="form-control">
                        <input type="text" name='phone' required placeholder="Your Phone" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <input type="email" required defaultValue={user?.email} name='email' placeholder="Your Email" className=" input input-bordered" />
                    </div>
                    </div>
                    <textarea placeholder="Your Message" name='message' className="textarea textarea-bordered textarea-lg w-full " ></textarea>

                    <div className="form-control mt-6">
                        <input type="submit" value="Order Confirm" className="btn btn-block" />
                    </div>
                </div>
            </form>
        </div>


    );
};

export default BookService;