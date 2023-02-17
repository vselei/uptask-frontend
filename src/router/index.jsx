import { createBrowserRouter } from 'react-router-dom';

import { AuthProvider } from '../context/AuthProvider';

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
import NewProject from '../pages/NewProject';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthProvider><AuthLayout /></AuthProvider>,
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
    element: <AuthProvider><ProtectedRoute /></AuthProvider>,
    children: [
      {
        index: true,
        element: <Projects />
      },
      {
        path: '/create-project',
        element: <NewProject />
      }
    ]
  }
]);

export default routes;
