import useAuth from './useAuth';

const useAdmin = project => {
  const { auth } = useAuth();

  return project.creator === auth._id;
};

export default useAdmin;
