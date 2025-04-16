import React, { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Ensure Firebase is correctly initialized
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // State for user data from Escuelajs API
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        navigate('/login'); // Redirect to login if no user is logged in
      } else {
        setUser(currentUser); // Set the user data after login

        // Fetch additional user data from the API (Escuelajs API)
        try {
          // Replace this with a real API call, passing user info like UID
          const response = await fetch('https://api.escuelajs.co/api/v1/users');
          const data = await response.json();

          // Find the user based on Firebase UID (assuming Escuelajs returns matching user data)
          const fetchedUser = data.find((user) => user.email === currentUser.email);
          setUserData(fetchedUser); // Set user data from Escuelajs API
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false); // Hide loading spinner once we get user data
    });

    // Cleanup the subscription when component unmounts
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Optional: Show a loading state while checking the user's auth state
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {user ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center">My Account</h2>
            <div className="text-center mb-6">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div> // Placeholder if no profile image
              )}
              <h3 className="text-xl font-semibold">{user.displayName || 'User Name'}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>

            {/* Display additional user info from the API */}
            {userData && (
              <div>
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <p className="text-gray-600">User ID: {userData.id}</p>
                <p className="text-gray-600">Name: {userData.name}</p>
                <p className="text-gray-600">Role: {userData.role}</p>
              </div>
            )}

            <button
              onClick={() => auth.signOut()}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
