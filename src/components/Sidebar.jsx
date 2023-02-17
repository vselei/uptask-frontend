import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl font-bold">Olá, {auth.name}</p>
      <Link
        to={'create-project'}
        className="bg-sky-600 w-full uppercase font-bold p-3 text-white block mt-5 text-center rounded-lg"
      >
        Novo Projeto
      </Link>
    </aside>
  );
};

export default Sidebar;
