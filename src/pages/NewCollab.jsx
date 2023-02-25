import { useEffect } from 'react';
import {
  Form,
  useActionData,
  useLoaderData,
  useParams
} from 'react-router-dom';
import Alert from '../components/Alert';
import CollabForm from '../components/CollabForm';
import axiosClient from '../config/axiosClient';
import useProjects from '../hooks/useProjects';

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
      msg: error?.response?.data?.msg,
      isError: true
    };
  }
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');

  if (email === '') {
    return {
      msg: 'O e-mail é obrigatório',
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

    const { data } = await axiosClient.post(
      '/projects/collaborators',
      { email },
      config
    );

    return data;
  } catch (error) {
    return {
      msg: error?.response?.data?.msg,
      isError: true
    };
  }
};

const NewCollab = () => {
  const data = useActionData();
  const project = useLoaderData();
  const { id } = useParams();

  const { setCollab, collab, addCollab, alert, showAlert } = useProjects();

  useEffect(() => {
    if (data?.name) {
      setCollab(data);
    }
  }, [data]);

  return (
    <>
      <h1 className="text-4xl font-black">
        Adicionar Collab ao Projeto: {project.name}
      </h1>
      <div className="mt-10 flex justify-center">
        <Form
          className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
          method="post"
          noValidate
        >
          {data?.msg && !data?.name && (
            <Alert isError={data?.isError}>{data?.msg}</Alert>
          )}
          <CollabForm />
        </Form>
      </div>

      {alert?.msg && <Alert isError={alert?.isError}>{alert?.msg}</Alert>}
      {collab?._id && (
        <div className="flex justify-center mt-10">
          <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
            <h2 className="text-center mb-10 font-bold text-2xl">Resultado:</h2>
            <div className="flex justify-between items-center">
              <p>{collab.name}</p>
              <button
                type="button"
                className="bg-slate-500 px-5 py-2 uppercase rounded-lg text-white font-bold text-sm"
                onClick={() =>
                  addCollab(
                    {
                      email: collab.email
                    },
                    id
                  )
                }
              >
                Adicionar ao Projeto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewCollab;
