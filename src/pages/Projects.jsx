import useProjects from '../hooks/useProjects';

const Projects = () => {
  const { projects } = useProjects();

  return (
    <>
      <h1 className="text-4xl font-black">Projetos</h1>

      <div></div>
    </>
  );
};

export default Projects;
