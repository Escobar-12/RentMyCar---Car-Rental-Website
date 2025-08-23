import React from 'react';
import Image from './Image';
import useApplication from '../hooks/applicationHook';

const UsersProfileCard = ({ user, removeUserLocal }) => {
  const {fetchWithToken} = useApplication();
  const handleRoleChange = async (role) =>
  {
    try{
      const res = await fetchWithToken('http://localhost:5007/users/updateUserRole',
        {
          method:"PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId:user._id,
            role:role
          })
        }
      )
      const data = await res.json();
      if(!res.ok)
      {
        throw new Error(data.message);
      }
    }
    catch (error) { console.error(error); }
  }

  const handleRemoveUser = async ()=>
  {
    try
    {
      const res = await fetchWithToken('http://localhost:5007/users/removeUser',
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId:user._id
          })  
        }
      )
      const data = await res.json();
      if(!res.ok)
      {
        throw new Error(data.message);
      }
      removeUserLocal(user._id);
    }
    catch (error) { console.error(error); }
  }
  
  return (
    <div className="relative min-w-80 max-w-85 sm:w-85 rounded-xl shadow-lg cursor-pointer bg-white pt-20 pb-4">
      
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
          <Image path={user?.img} alt={user?.name || "User"} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center px-4">
        <h2 className="font-semibold text-xl">{user?.name}</h2>
        <div className="text-center overflow-hidden h-0 ">
          <p className="text-sm text-gray-500 ">Description</p>
          <p>{user?.desc}</p>
        </div>
        <div className='w-full flex items-end justify-between gap-3'>
          <div className="w-full">
            <label htmlFor="roleselect" className="block mb-1 font-semibold text-neutral-400">Role</label>
            <select name="Role" id="roleselect" defaultValue={user?.role || 2000} className="border-2 h-12 border-neutral-400/70 rounded px-2 py-1 w-full text-lg font-semibold text-neutral-700 " onChange={(e) => handleRoleChange(Number(e.target.value))}>
              <option value={2000}>User</option>
              <option value={3000}>Editor</option>
              <option value={4000}>Admin</option>
            </select>
          </div>
          <div className='text-center'>
                <div onClick={() => handleRemoveUser()} className='p-3 bg-red-400/80 text-white font-semibold rounded-lg hover:bg-red-500 transition-all duration-200'>Remove</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersProfileCard;
