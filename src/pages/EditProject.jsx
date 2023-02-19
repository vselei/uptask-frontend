import { Form as Formulary, redirect, useLoaderData } from 'react-router-dom';
import Form from '../components/Form';

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

const EditProject = () => {
  const data = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl">Editar Projeto: {data?.name}</h1>
      <div className='mt-10 flex justify-center'>
        <Formulary>
          <Form project={data} />
        </Formulary>
      </div>
    </>
  );
};

export default EditProject;
