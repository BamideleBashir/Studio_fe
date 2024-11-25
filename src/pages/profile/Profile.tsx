import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/reduxHooks';

type IUser = {
  byteId: string;
  country: string;
  dob: string; // You might want to use a Date type here depending on usage
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber: string;
  photo: string;
}

const Profile = () => {
  const user: IUser = useAppSelector((state) => state.auth.user);

  console.log(user);

  const [userData, setUserData] = useState<IUser>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
  }

  return (
    <div className='max-w-[800px] mx-auto mt-4 px-4'>
      <h1
        className='text-2xl font-bold mb-10'
      >Profile</h1>

      {/* profile image */}
      <div>
        <img
          className='w-32 h-32 rounded-full mb-10 text-center m-auto'
          src={userData.photo} alt="profile" />

        {/* <input type="file" id="photo" name="photo" onChange={handleChange} /> */}
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className='mb-4'
        >
          <label htmlFor="firstName">First Name</label>
          <input 
            className='border border-gray-300 rounded-md p-2 block w-full'
          type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleChange} />
        </div>
        <div
          className='mb-4'
        >
          <label htmlFor="lastName">Last Name</label>
          <input
            className='border border-gray-300 rounded-md p-2 block w-full'
            type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} />
        </div>
        <div
          className='mb-4'
        >
          <label htmlFor="email">Email</label>
          <input
            className='border border-gray-300 rounded-md p-2 block w-full'
            type="email" id="email" name="email" value={userData.email} onChange={handleChange} />
        </div>
        <div
          className='mb-4'
        >
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            className='border border-gray-300 rounded-md p-2 block w-full'
            type="text" id="phoneNumber" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
        </div>
        <button
          className='bg-blue-500 text-white rounded-md p-2 block w-full'
          type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Profile