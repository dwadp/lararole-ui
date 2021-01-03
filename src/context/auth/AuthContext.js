import React from 'react';

import { useState } from 'react';

import axios from 'axios';

import { api } from '../../lib/api';
import * as storage from '../../lib/storage';

const defaultUserState = {
  data: {
    id: null,
    name: "",
    email: "",
    email_verified_at: null
  },
  permissions: []
};

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(defaultUserState);

  const updateUser = (user) => {
    setUser({
      user: user.data,
      permissions: user.permissions
    });
  };

  const logout = async () => {
    await api.get('/auth/logout');

    storage.remove('token');

    setAuthenticated(false);
    setUser(defaultUserState);
  };

  const checkIsAuthenticated = async () => {
    const token = storage.get('token');

    if(!token) {
      setAuthenticated(false);
      return;
    }

    if(authenticated) {
      return;
    }

    try {
      const response = await axios.get('http://localhost:8081/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setAuthenticated(true);
      setUser({
        data: response.data.data.user,
        permissions: response.data.data.permissions
      });
    } catch(error) {
      setAuthenticated(false);
      setUser(defaultUserState);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        user,
        updateUser,
        checkIsAuthenticated,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
