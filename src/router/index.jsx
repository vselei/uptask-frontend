import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import ConfirmAccount, {
  loader as confirmAccountLoader
} from '../pages/ConfirmAccount';
import ForgotPassword, {
  action as forgotPasswordAction
} from '../pages/ForgotPassword';
import Login from '../pages/Login';
import NewPassword, {
  action as newPasswordAction,
  loader as newPasswordLoader
} from '../pages/NewPassword';
import SignUp, { action as signUpAction } from '../pages/SignUp';

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
  }
]);

export default routes;
