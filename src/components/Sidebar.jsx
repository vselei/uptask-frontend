import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl font-bold">Olá, Victor</p>
      <Link to={'create-project'} className="bg-sky-600 w-full uppercase font-bold p-3 text-white">Novo Projeto</Link>
    </aside>
  );
};

export default Sidebar;
