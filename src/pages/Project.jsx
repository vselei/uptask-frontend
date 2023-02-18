import axiosClient from '../config/axiosClient';

export const loader = async ({ params }) => {
  const { id } = params;

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

  try {
    const {data} = await axiosClient(`/projects/${id}`, config);
  } catch (error) {}
};

const Project = () => {
  return <div>1</div>;
};

export default Project;
