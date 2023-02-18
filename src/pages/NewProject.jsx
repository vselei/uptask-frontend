import { Form as Formulary, useActionData } from 'react-router-dom';

import Form from '../components/Form';
import Alert from '../components/Alert';
import useProjects from '../hooks/useProjects';
import { useEffect } from 'react';

export const action = async ({ request }) => {
  const form = await request.formData();
  const inputs = Object.fromEntries(form);

  if (Object.values(inputs).includes('')) {
    return {
      msg: 'Todos os campos são obrigatórios',
      isError: true
    };
  }

  return inputs;
};

const NewProject = () => {
  const data = useActionData();

  const { showAlert, alert, submitProjects } = useProjects();

  useEffect(() => {
    if (data?.msg) {
      showAlert(data);
    }
  }, [data]);

  useEffect(() => {
    if (data?.name) {
      submitProjects(data);
    }
  }, [data]);

  return (
    <>
      <h1 className="text-4xl font-black">Novo Projeto</h1>

      <div className="mt-10 flex justify-center">
        <Formulary
          method="post"
          className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
        >
          {alert?.msg && <Alert isError={alert?.isError}>{alert?.msg}</Alert>}
          <Form />
        </Formulary>
      </div>
    </>
  );
};

export default NewProject;
