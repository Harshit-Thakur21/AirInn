import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios';

const Home = () => {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/home/places').then(response => {
      setPlaces(response.data);
    })
  }, [])
  return (
    <div className='mt-8 gap-6 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {places.length > 0 && places.map(place => (

        <Link key={place._id} to={'/place/' + place._id}>
          <div className='bg-gray-500 mb-2 rounded-2xl flex'>
            {place.images?.[0] && (
              <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/' + place.images?.[0]} alt="" />
            )}
          </div>
          <h2 className='font-bold'>{place.address}</h2>
          <h3 className='text-sm text-gray-500'>{place.title}</h3>
          <div className='mt-1'>
            <span className="font-bold">₹{place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Home