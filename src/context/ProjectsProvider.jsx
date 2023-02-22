import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../config/axiosClient';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [taskModal, setTaskModal] = useState(false);
  const [task, setTask] = useState({});

  const navigate = useNavigate();

  const showAlert = alert => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitProjects = async project => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axiosClient.post('/projects', project, config);

      setProjects([...projects, data]);

      setAlert({
        msg: 'Projeto criado corretamente',
        isError: false
      });

      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };

        const { data } = await axiosClient('/projects', config);

        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
  }, []);

  const updateProject = async actionData => {
    const updatedProjects = projects.map(projectState =>
      projectState._id === actionData._id ? actionData : projectState
    );

    setProjects(updatedProjects);

    setAlert({
      msg: 'Projeto atualizado corretamente',
      isError: false
    });

    setTimeout(() => {
      setAlert({});
      navigate('/projects');
    }, 3000);
  };

  const deleteProject = async id => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axiosClient.delete(`/projects/${id}`, config);

      setAlert({
        msg: data.msg,
        isError: false
      });

      const updatedProjects = projects.filter(p => p._id !== id);
      setProjects(updatedProjects);

      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskModal = () => {
    setTaskModal(!taskModal);
    setTask({});
  };

  const submitTask = async task => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      await axiosClient.post('/tasks', task, config);
      setAlert({});
      setTaskModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = task => {
    setTask(task);
    setTaskModal(true);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProjects,
        updateProject,
        deleteProject,
        handleTaskModal,
        taskModal,
        submitTask,
        handleTaskModal,
        task,
        handleEditTask
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };
export default ProjectsContext;
