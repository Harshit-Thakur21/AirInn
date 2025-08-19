    import { useEffect, useState } from 'react'
    import Perks from '../components/Perks';
    import axios from 'axios';
    import ImagesUploader from '../components/ImagesUploader';
    import AccountNav from '../components/AccountNav';
    import { Navigate, useParams } from 'react-router-dom';

    const PlacesFormPage = () => {

        const {id} = useParams();

        const [title, setTitle] = useState('');
        const [address, setAddress] = useState('');
        const [addedImages, setAddedImages] = useState([]);
        const [description, setDescription] = useState('');
        const [perks, setPerks] = useState([]);
        const [extraInfo, setExtraInfo] = useState('');
        const [checkIn, setCheckIn] = useState('');
        const [checkOut, setCheckOut] = useState('');
        const [maxGuest, setMaxGuets] = useState(1);

        const [redirect, setRedirect] = useState(false);

        useEffect(() => {
            if(!id)
            {
                return;
            }

            axios.get('/places/' +id).then(response => {
                const {data} = response;
                setTitle(data.title);
                setAddress(data.address);
                setAddedImages(data.images);
                setDescription(data.description);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuets(data.maxGuest);
            });
        }, [id])

        function inputHeader(text) {
            return(
                <h2 className='text-2xl mt-4'>{text}</h2>
            )
        }

        function inputDescription(text) {
            return(
                <p className='text-gray-500 text-sm'>{text}</p>
            )
        }

        function preInput(header, description) {
            return(
                <>
                    {inputHeader(header)}
                    {inputDescription(description)}
                </>
            )
        }


        async function savePlace(e)
        {
            e.preventDefault();

            const placeData = {
                title, address, addedImages,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuest
            };

            if(id)
            {
                //update or edit data

                await axios.put('/places/', {id, ...placeData}); 

                setRedirect(true);
            }
            else
            {
                //save new data

                await axios.post('/places/', placeData); // i used / becuase i only wanted to hit '/places' endpoint

                setRedirect(true);

            }

        }
        
        if(redirect)
        {
            return <Navigate to={'/account/places'}/>
        }

        return (
            <div>

                <AccountNav/>


                <form action="" onSubmit={savePlace}>
                    {preInput('Title', 'Title for your place, should be short.')}
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Title, eg: My Apt' />

                    {preInput('Address', 'Address to your place.')}
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder='Address, eg: 123 Main St' />

                    {preInput('Images', 'More Equals Better')}
                    <ImagesUploader addedImages={addedImages} onChange={setAddedImages} />

                    {preInput("Description", 'Tell us about your place.')}
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />

                    {preInput('Perks', 'Perks of your place, eg: Wi-Fi, Gym, etc.')}
                    <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                        <Perks selected={perks} onChange={setPerks} />
                    </div>

                    {preInput('Extra Info', 'House rules, etc.')}
                    <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

                    {preInput('Check In & Out times', 'Add Check In & Out Time, Remember to have some time window for cleaning between guests.')}
                    <div className='grid gap-2 sm:grid-cols-3'>
                        <div>
                            <h3 className='mt-2 -mb-1'>Check In Time</h3>
                            <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder='14:00' />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1'>Check Out Time</h3>
                            <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder='14:00' />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1'>Maximum number of Guests</h3>
                            <input type="number" value={maxGuest} onChange={e => setMaxGuets(e.target.value)} />
                        </div>
                    </div>
                    <button className='primary my-4'>Save</button>
                </form>
            </div>
        )
    }

    export default PlacesFormPage