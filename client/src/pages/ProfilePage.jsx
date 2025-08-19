import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import PlacesPage from './PlacesPage';
import AccountNav from '../components/AccountNav';

const ProfilePage = () => {

  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  //have to write this on top, otherwise shows warning
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }


  async function logout() {
    await axios.post('/user/logout');
    alert('Logged out Successfully');
    setRedirect('/');
    setUser(null);
  }


  //if not ready //can also add loading animation later
  if (!ready) {
    return 'Loading...';
  }

  //if the user is not logged in
  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }



  if (redirect) {
    return <Navigate to={redirect} />
  }


  return (
    <div>

      <AccountNav/>

      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>

          Logged In as {user.name} ({user.email})<br />
          <button onClick={logout} className='primary max-w-sm mt-4'>Logout</button>

        </div>
      )}

      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  )
}

export default ProfilePage