import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const Bookings = () => {

    const {user} = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
  const navigate = useNavigate()
    const url = `https://car-doctor-server-green.vercel.app/bookings?email=${user.email}`
    useEffect(()=>{
        fetch(url,{
          method: 'GET',
          headers:{
            authorization : `bearer ${localStorage.getItem('car-access-token')} `
          }
        })
        .then(res=>res.json())
        .then(data=>{
           if(!data.error){
            setBookings(data)
           }
           else{
            navigate('/')

           }
        })
    },[url])
    console.log(bookings)

    const handleDelete = id =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`https://car-doctor-server-green.vercel.app/bookings/${id}`,{
                method: "DELETE"
              })
              .then(res=>res.json())
              .then(data=>{
                console.log(data)
                if(data.deletedCount>0){
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    const remaining = bookings.filter(booking=> booking._id !== id)
                    setBookings(remaining);
                }
              })

                
            }
          }) 
    }

    const handleConfirm =id =>{
        fetch(`https://car-doctor-server-green.vercel.app/bookings/${id}`, {
            method:"PATCH",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({status : "Confirm"})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount > 0){
                const remaining = bookings.filter(booking=> booking._id !== id)
                const updated = bookings.find(booking=>booking._id === id)
                updated.status = 'confirm'
                const newBookings = [updated, ...remaining];
                setBookings(newBookings)
            }
        })
    }
    return (
        <div>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            
          </label>
        </th>
        <th>Service</th>
        <th>Price</th>
        <th>Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */} 
      {
        bookings.map(booking=><BookingRow key={booking._id} booking={booking} handleConfirm={handleConfirm} handleDelete={handleDelete}></BookingRow>)
      }
     
     
      
    </tbody>
    
    
  </table>
</div>
        </div>
    );
};

export default Bookings;