import {
  Form as Formulary,
  redirect,
  useActionData,
  useLoaderData
} from 'react-router-dom';

import Form from '../components/Form';
import Alert from '../components/Alert';

import axiosClient from '../config/axiosClient';

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
    const { data } = await axiosClient.put(
      `/projects/${params.id}`,
      data,
      config
    );
  } catch (error) {}
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

  return (
    <>
      <h1 className="font-black text-4xl">Editar Projeto: {data?.name}</h1>
      <div className="mt-10 flex justify-center">
        <Formulary method="post">
          {actionData?.msg && (
            <Alert isError={actionData?.isError}>{actionData?.msg}</Alert>
          )}
          <Form project={data} />
        </Formulary>
      </div>
    </>
  );
};

export default EditProject;
