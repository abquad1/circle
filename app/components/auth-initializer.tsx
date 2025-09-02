'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/slice';

const AuthInitializer = () => {
  const dispatch = useDispatch();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('currentUser');
//     if (storedUser) {
//       dispatch(login(JSON.parse(storedUser)));
//     }
//   }, [dispatch]);

//   return null;
// };

useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      
      if (storedUser && storedUser !== 'null' && storedUser !== 'undefined') {
        // Check if it's a valid JSON string
        if (storedUser.startsWith('{') || storedUser.startsWith('[')) {
          const parsedUser = JSON.parse(storedUser);
          dispatch(login(parsedUser));
        } else {
          // If it's "[object Object]" or other invalid format, clear it
          console.warn('Invalid user data in localStorage, clearing...');
          localStorage.removeItem('currentUser');
        }
      }
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      // Clear invalid data from localStorage
      localStorage.removeItem('currentUser');
    }
  }, [dispatch]);

  return null;
}

export default AuthInitializer;