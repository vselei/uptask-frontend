import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import ConfirmAccount from '../pages/ConfirmAccount';
import ForgotPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import NewPassword from '../pages/NewPassword';
import SignUp from '../pages/SignUp';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/forgot-password/:token',
        element: <NewPassword />
      },
      {
        path: '/confirm/:id',
        element: <ConfirmAccount />
      }
    ]
  }
]);

export default routes;
