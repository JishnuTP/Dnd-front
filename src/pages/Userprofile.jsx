import React, { useContext, useState } from 'react';
import { mainContext } from '../context/mainContex';
import Header from '../component/Header';

const UserProfile = () => {
  const { user } = useContext(mainContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <>
<Header/>
    <div className="w-full mx-auto py-12 px-32 bg-gradient-to-r from-blue-500 via-white to-green-400 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-6">User Profile</h1>

        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div>
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xl font-semibold text-indigo-600">{user.name}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Full Name</span>
                <span className="text-gray-500">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Email</span>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Role</span>
                <span className="text-gray-500">{user.role}</span>
              </div>
            </div>

            {/* Optional: Add a button to edit the profile */}
            <div className="mt-6 text-center">
              <button className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all">
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default UserProfile;
