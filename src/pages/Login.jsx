import { Link, useActionData, useNavigate, Form } from 'react-router-dom';

import Alert from '../components/Alert';

import axiosClient from '../config/axiosClient';

export const action = async ({ request }) => {
  const form = await request.formData();

  const { email, password } = Object.fromEntries(form);

  if ([email, password].includes('')) {
    return {
      msg: 'Todos os campos são obrigatórios',
      isError: true
    };
  }

  try {
    const { data } = await axiosClient.post('/users/login', {
      email,
      password
    });

    localStorage.setItem("token", data.token)
    return {}
  } catch (error) {
    return {
      msg: error.response.data.msg,
      isError: true
    };
  }
};

const Login = () => {
  const alert = useActionData();

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Iniciar sessão e administrar seus{' '}
        <span className="text-slate-700">projetos</span>
      </h1>
      {alert?.msg && <Alert isError={alert?.isError}>{alert?.msg}</Alert>}
      <Form method='post' className="my-10 bg-white shadow rounded-lg p-10">
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
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Senha
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
          value="Iniciar Sessão"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </Form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/sign-up"
        >
          Não tem uma conta? Cadastre-se
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/forgot-password"
        >
          Esqueceu sua senha?
        </Link>
      </nav>
    </>
  );
};

export default Login;
