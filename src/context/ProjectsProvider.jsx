import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../config/axiosClient';

import io from 'socket.io-client';

let socket;

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [taskModal, setTaskModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [task, setTask] = useState({});
  const [collab, setCollab] = useState({});
  const [deleteCollabModal, setDeleteCollabModal] = useState(false);
  const [search, setSearch] = useState(false);

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

  useEffect(() => {
    socket = io(import.meta.env.VITE_API_URL);
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

  const createTask = async task => {
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

      const { data } = await axiosClient.post('/tasks', task, config);
      setAlert({});
      setTaskModal(false);

      /* socket io */
      socket.emit('new task', data);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async task => {
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

      const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config);
      setAlert({});
      setTaskModal(false);

      socket.emit('update task', data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitTask = async task => {
    if (task?.id) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  const handleEditTask = task => {
    setTask(task);
    setTaskModal(true);
  };

  const handleDeleteTaskModal = task => {
    setTask(task);
    setDeleteTaskModal(!deleteTaskModal);
  };

  const deleteTask = async () => {
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

      const { data } = await axiosClient.delete(`/tasks/${task._id}`, config);

      setAlert({
        msg: data.msg,
        isError: false
      });

      setDeleteTaskModal(false);

      socket.emit('delete task', task);

      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const addCollab = async (email, projectId) => {
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

      const { data } = await axiosClient.post(
        `/projects/collaborators/${projectId}`,
        email,
        config
      );

      setAlert({
        msg: data.msg,
        isError: false
      });
      setCollab({});
      setAlert({});
    } catch (error) {
      showAlert({
        msg: error.response.data.msg,
        isError: true
      });
    }
  };

  const handleDeleteCollabModal = collaborator => {
    setDeleteCollabModal(!deleteCollabModal);
    setCollab(collaborator);
  };

  const deleteCollab = async projectId => {
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

      const { data } = await axiosClient.post(
        `/projects/delete-collaborator/${projectId}`,
        { id: collab._id },
        config
      );

      setAlert({
        msg: data.msg,
        isError: false
      });

      setDeleteCollabModal(false);
      setCollab({});

      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async id => {
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

      const { data } = await axiosClient.post(`/tasks/state/${id}`, {}, config);

      setTask({});
      setAlert({});

      socket.emit('change state', data.storedTask);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    setSearch(!search);
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
        task,
        handleEditTask,
        handleDeleteTaskModal,
        deleteTaskModal,
        deleteTask,
        setCollab,
        collab,
        addCollab,
        deleteCollabModal,
        handleDeleteCollabModal,
        deleteCollab,
        completeTask,
        search,
        handleSearch
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };
export default ProjectsContext;
