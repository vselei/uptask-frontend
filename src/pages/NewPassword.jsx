import { useLoaderData, Form, useActionData, Link } from 'react-router-dom';

import axios from 'axios';

import Alert from '../components/Alert';

export const loader = async ({ params }) => {
  const {token} = params;

  try {
    await axios(
      `${import.meta.env.VITE_API_URL}/api/users/forgot-password/${
        token
      }`
    );

    return {
      isValid: true,
      token
    };
  } catch (error) {
    return {
      msg: error.response.data.msg,
      isError: true
    };
  }
};

export const action = async ({ request, params }) => {
  const form = await request.formData();
  const password = form.get('password');

  if (password.length < 6) {
    return {
      msg: 'A senha tem que ter no mínimo 6 caracteres',
      isError: true
    };
  }

  try {
    const url = `${import.meta.env.VITE_API_URL}/api/users/forgot-password/${params.token}`;
    const { data } = await axios.post(url, {
      password
    });
    console.log(data);
    return {
      msg: data.msg,
      isError: false
    };
  } catch (error) {
    return {
      msg: error?.response?.data?.msg,
      isError: true
    };
  }
};


const NewPassword = () => {
  const data = useLoaderData();
  const alert = useActionData();

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Insira uma nova senha e não perca acesso ao seus{' '}
        <span className="text-slate-700">projetos</span>
      </h1>
      {(data?.msg || alert?.msg) && (
        <Alert isError={data?.isError || alert?.isError}>
          {data?.msg || alert?.msg}
        </Alert>
      )}
      {data?.isValid && (
        <Form method="post" className="my-10 bg-white shadow rounded-lg p-10">
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nova Senha
            </label>
            <input
              name="password"
              type="password"
              placeholder="Digite sua senha"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="password"
            />
          </div>
          <input
            type="submit"
            value="Salvar Nova Senha"
            className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </Form>
      )}

      {!alert?.isError && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Inicie sua sessão
        </Link>
      )}
    </>
  );
};

export default NewPassword;
