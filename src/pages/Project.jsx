import { redirect, useLoaderData } from 'react-router-dom';

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
    const { data } = await axiosClient(`/projects/${id}`, config);
    return data;
  } catch (error) {
    return redirect('/');
  }
};

const Project = () => {
  const data = useLoaderData();

  return (
    <div>
      <h1 className="font-black text-4xl">{data?.name}</h1>
    </div>
  );
};

export default Project;
