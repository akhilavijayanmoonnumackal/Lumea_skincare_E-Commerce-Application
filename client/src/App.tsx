import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import React from 'react';
import { AuthProvider } from './context/AuthContext';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App;
