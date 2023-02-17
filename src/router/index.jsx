import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import ConfirmAccount, {
  loader as confirmAccountLoader
} from '../pages/ConfirmAccount';
import ForgotPassword, {
  action as forgotPasswordAction
} from '../pages/ForgotPassword';
import Login, { action as loginAction } from '../pages/Login';
import NewPassword, {
  loader as newPasswordLoader,
  action as newPasswordAction
} from '../pages/NewPassword';
import SignUp, { action as signUpAction } from '../pages/SignUp';

import ProtectedRoute from '../layouts/ProtectedRoute';
import Projects from '../pages/Projects';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
        action: loginAction
      },
      {
        path: '/sign-up',
        element: <SignUp />,
        action: signUpAction
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
        action: forgotPasswordAction
      },
      {
        path: '/forgot-password/:token',
        element: <NewPassword />,
        action: newPasswordAction,
        loader: newPasswordLoader
      },
      {
        path: '/confirm/:id',
        element: <ConfirmAccount />,
        loader: confirmAccountLoader
      }
    ]
  },
  {
    path: '/projects',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Projects />
      }
    ]
  }
]);

export default routes;
