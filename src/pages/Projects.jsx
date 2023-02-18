import useProjects from '../hooks/useProjects';

const Projects = () => {
  const { projects } = useProjects();

  console.log(projects);

  return (
    <>
      <h1 className="text-4xl font-black">Projetos</h1>

      <div className="bg-white shadow mt-10 rounded-lg p-5">
        {projects.length ? (
          <p>Tem projetos</p>
        ) : (
          <p className="text-center text-gray-600 uppercase">Não tem projetos</p>
        )}
      </div>
    </>
  );
};

export default Projects;
