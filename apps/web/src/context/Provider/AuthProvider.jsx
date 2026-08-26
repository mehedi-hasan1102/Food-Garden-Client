import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import axiosSecure from '../../api/axios';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const createUserWithLoginGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const profile = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    await axiosSecure.post('/logout');
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axiosSecure.post('/jwt', { email: currentUser.email })
          .then(res => {
            if (res.data.ok) {
              console.log('Token issued');
            }
          })
          .catch(err => console.error(err));
      } else {
        axiosSecure.post('/logout')
          .then(res => {
            if (res.data.ok) {
              console.log('Token cleared');
            }
          })
          .catch(err => console.error(err));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    response => response,
    async error => {
      if (error.response && error.response.status === 401) {
        await logout();
      }
      return Promise.reject(error);
    }
  );

  const authData = {
    user,
    setUser,
    createUser,
    logout,
    loginUser,
    loading,
    setLoading,
    profile,
    createUserWithLoginGoogle,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporting the useAuth hook to be used in other components
export const useAuth = () => {
  return React.useContext(AuthContext);
};

export default AuthProvider;
