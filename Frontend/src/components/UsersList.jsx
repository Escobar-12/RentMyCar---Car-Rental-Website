import React from 'react'
import Title from '../components/Title'
import { useState } from 'react'
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import BookingCardSkeleton from '../components/BookingSkeleton'
import useApplication from '../hooks/applicationHook'
import UsersProfileCard from './UsersProfileCard'
import ProfileSkeletonLoading from './ProfileSkeleton'

const UsersList = () => {

  const [users, setUsers] = useState([]);
  const {token} = useAuth();
  const {fetchWithToken} = useApplication();

  const fetchAllUsers = async () =>
  {
    try
    {
      const res = await fetchWithToken(`http://localhost:5007/users/allusers`,
        {
          method:"GET",
        }
      );

      const data = await res.json();
      if (!res.ok) {
          throw new Error(data.message);
      }
      setUsers(data.data);
    }
    catch (error) { console.error(error); }
  }

  const removeUserLocal = (userId) => {
    setUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  useEffect(()=>
  {
    fetchAllUsers();
  },[])


  return (
    <div className='max-w-[1650px] mt-15 lg:mt-30 mx-auto mb-40 px-4 md:px-8 lg:px-16 w-full'>
        <Title title={"All Users"} align={"left"}/>
        <div className='mt-30 w-full flex items-center gap-x-4 gap-y-20 flex-wrap justify-center xl:justify-start'>
            
            { users?.length > 0 ?

              (
                users.map((user) => (
                    <UsersProfileCard key={user._id} user={user} removeUserLocal={removeUserLocal}/>                    
                ))
              ):
              (
                Array.from({length : 6}).map((_, index)=>
                (
                  <ProfileSkeletonLoading/>
                ))
              )
            }
        </div>
    </div>
  )
}

export default UsersList