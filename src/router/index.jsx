import { createBrowserRouter } from 'react-router-dom';

import { AuthProvider } from '../context/AuthProvider';
import { ProjectsProvider } from '../context/ProjectsProvider';

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
import NewProject, { action as newProjectAction } from '../pages/NewProject';
import Project, { loader as projectLoader } from '../pages/Project';
import EditProject, {
  loader as editProjectLoader,
  action as editProjectAction
} from '../pages/EditProject';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <AuthLayout />
      </AuthProvider>
    ),
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
    element: (
      <ProjectsProvider>
        <AuthProvider>
          <ProtectedRoute />
        </AuthProvider>
      </ProjectsProvider>
    ),
    children: [
      {
        index: true,
        element: <Projects />
      },
      {
        path: '/projects/create-project',
        element: <NewProject />,
        action: newProjectAction
      },
      {
        path: '/projects/:id',
        element: <Project />,
        loader: projectLoader
      },
      {
        path: '/projects/edit/:id',
        element: <EditProject />,
        loader: editProjectLoader,
        action: editProjectAction
      }
    ]
  }
]);

export default routes;
