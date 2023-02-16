import { useLoaderData, Form } from 'react-router-dom';

import axios from 'axios';

import Alert from '../components/Alert';

export const loader = async ({ params }) => {
  try {
    await axios(
      `${import.meta.env.VITE_API_URL}/api/users/forgot-password/${
        params.token
      }`
    );

    return {
      isValid: true
    };
  } catch (error) {
    return {
      msg: error.response.data.msg,
      isError: true
    };
  }
};

export const action = async ({ params, request }) => {
  return null;
};

const NewPassword = () => {
  const data = useLoaderData();

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Insira uma nova senha e não perca acesso ao seus{' '}
        <span className="text-slate-700">projetos</span>
      </h1>
      {data?.msg && <Alert isError={data?.isError}>{data?.msg}</Alert>}
      {data?.isValid && (
        <Form className="my-10 bg-white shadow rounded-lg p-10">
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
    </>
  );
};

export default NewPassword;
