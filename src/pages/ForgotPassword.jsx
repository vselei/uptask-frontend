import { Link, Form, useActionData } from 'react-router-dom';

import Alert from '../components/Alert';

import axios from 'axios'

export const action = async ({ request }) => {
  const form = await request.formData();

  const data = Object.fromEntries(form);

  const { email } = data;

  if (email === '' || email.length < 6) {
    return {
      msg: 'O email é obrigatório',
      isError: true
    };
  }

  try {
    const { data: response } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/forgot-password`,
      {
        email
      }
    );

    return {
      msg: response.msg,
      isError: false
    }
  } catch (error) {
    return {
      msg: error.response.data.msg,
      isError: true
    };
  }

};

const ForgotPassword = () => {
  const alert = useActionData();

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupere seu acesso e não perda seu{' '}
        <span className="text-slate-700">projetos</span>
      </h1>
      {alert?.msg && <Alert isError={alert?.isError}>{alert?.msg}</Alert>}
      <Form method="post" className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="email"
          />
        </div>
        <input
          type="submit"
          value="Enviar e-mail"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </Form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Possui uma conta? Inicie sua sessão!
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/sign-up"
        >
          Não tem uma conta? Cadastre-se
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
