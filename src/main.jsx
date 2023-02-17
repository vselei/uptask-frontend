import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import routes from './router';

import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </React.StrictMode>
);
