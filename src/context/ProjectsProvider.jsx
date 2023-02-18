import { useState, useEffect, createContext } from 'react';
import axiosClient from '../config/axiosClient';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});

  const showAlert = alert => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitProjects = async project => {
    console.log(project)
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProjects
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };
export default ProjectsContext;
