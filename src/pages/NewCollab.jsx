import { Form, useActionData, useLoaderData } from 'react-router-dom';
import Alert from '../components/Alert';
import CollabForm from '../components/CollabForm';
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
    return {
      msg: error?.data?.response?.msg,
      isError: true
    };
  }
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');

  if (email === '') {
    return {
      msg: 'O e-mail é obrigatórios',
      isError: true
    };
  }
};

const NewCollab = () => {
  const data = useActionData();
  const project = useLoaderData();

  return (
    <>
      <h1 className="text-4xl font-black">Adicionar Collab ao Projeto: {project.name}</h1>
      <div className="mt-10 flex justify-center">
        <Form
          className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
          method="post"
          noValidate
        >
          {data?.msg && <Alert isError={data?.isError}>{data?.msg}</Alert>}
          <CollabForm />
        </Form>
      </div>
    </>
  );
};

export default NewCollab;
