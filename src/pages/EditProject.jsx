import {
  Form as Formulary,
  redirect,
  useActionData,
  useLoaderData
} from 'react-router-dom';

import Form from '../components/Form';
import Alert from '../components/Alert';

import axiosClient from '../config/axiosClient';
import { useEffect } from 'react';
import useProjects from '../hooks/useProjects';

export const action = async ({ params, request }) => {
  const form = await request.formData();

  const data = Object.fromEntries(form);

  if (Object.values(data).includes('')) {
    return {
      msg: 'Todos os campos são obrigatórios',
      isError: true
    };
  }

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

    const { data: response } = await axiosClient.put(
      `/projects/${params.id}`,
      data,
      config
    );

    return response;
  } catch (error) {
    return {
      msg: error?.response?.data?.msg,
      isError: true
    };
  }
};

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
  const actionData = useActionData();

  const { updateProject, alert, deleteProject } = useProjects();

  useEffect(() => {
    if (actionData && !actionData?.msg) {
      updateProject(actionData);
    }
  }, [actionData]);

  const handleClick = () => {
    if (confirm('Deseja eliminar esse projeto?')) {
      deleteProject(data?._id);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">Editar Projeto: {data?.name}</h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>

          <button onClick={handleClick} className="uppercase font-bold">
            Eliminar
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Formulary method="post">
          {(alert?.msg || actionData?.msg) && (
            <Alert isError={alert?.isError || actionData?.isError}>
              {actionData?.msg || alert?.msg}
            </Alert>
          )}
          <Form project={data} />
        </Formulary>
      </div>
    </>
  );
};

export default EditProject;
