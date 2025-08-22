import React, { useContext, useEffect, useState } from 'react'
import {differenceInCalendarDays} from 'date-fns'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const BookingWidget = ({place}) => {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuest, setNumberOfGuest] = useState(1);
    let numberOfNights = 0;
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [redirect, setRedirect] = useState('');

    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user)
        {
            setName(user.name);
        }
    }, [user]);

    if(checkIn && checkOut)
    {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPLace()
    {
        const data = {
            checkIn, checkOut, numberOfGuest, 
            name, mobile, place:place._id,
            price: numberOfNights * place.price,
        }
        const response = await axios.post('/bookings/', data);

        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect)
    {
        return <Navigate to={redirect}/>
    }
    

    return (
        <div className='bg-white shadow p-4 rounded-2xl '>
            <div className='text-2xl text-center'>
                Price: ₹{place.price} / per night
            </div>

            <div className='border border-gray-300 rounded-2xl mt-4'>
                <div className="flex">
                    <div className=' py-3 px-4'>
                        <label>Check In: </label>
                        <input 
                            type="date" 
                            value={checkIn} 
                            onChange={e => setCheckIn(e.target.value)}  name="" />
                    </div>
                    <div className='mt-1 py-3 px-4 border-gray-300 border-l'>
                        <label>Check Out: </label>
                        <input 
                            type="date" 
                            value={checkOut} 
                            onChange={e => setCheckOut(e.target.value)} name="" />
                    </div>
                </div>
                <div className='mt-1 py-3 px-4 border-gray-300 border-t'>
                    <label>Number of Guests: </label>
                    <input 
                        type="number" 
                        value={numberOfGuest} 
                        onChange={e => setNumberOfGuest(e.target.value)} name="" />
                </div>


                {numberOfNights > 0 && (
                    <div className='mt-1 py-3 px-4 border-gray-300 border-t'>
                        <label>Your Full Name: </label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} name="" />
                        
                        <label>Phone Number: </label>
                        <input
                            type="tel"
                            value={mobile}
                            onChange={e => setMobile(e.target.value)} name="" />
                    </div>
                )}
            </div>

            <button onClick={bookThisPLace} className='primary mt-4'>
                Book this place
                {numberOfNights > 0 && (
                    <span> for ₹{numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    )
}

export default BookingWidget