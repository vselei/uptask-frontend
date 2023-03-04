import PreviewProject from '../components/PreviewProject';
import useProjects from '../hooks/useProjects';
import io from 'socket.io-client';
import { useEffect } from 'react';

let socket;

const Projects = () => {
  const { projects } = useProjects();

  useEffect(() => {
    socket = io(import.meta.env.VITE_API_URL);
    socket.emit('proof', projects)
  }, []);

  return (
    <>
      <h1 className="text-4xl font-black">Projetos</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ? (
          projects.map(project => (
            <PreviewProject key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            Não tem projetos
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
