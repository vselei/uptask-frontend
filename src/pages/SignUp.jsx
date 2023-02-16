import axios from 'axios';

import { Link, Form, useActionData } from 'react-router-dom';
import Alert from '../components/Alert';

export const action = async ({ request }) => {
  const form = await request.formData();

  const data = Object.fromEntries(form);

  const { password, 'confirm-password': confirmPassword } = data;

  if (Object.values(data).includes('')) {
    return {
      msg: 'Todos os campos são obrigatórios',
      isError: true
    };
  }

  if (password !== confirmPassword) {
    return {
      msg: 'As senhas não são iguais',
      isError: true
    };
  }

  if (password.length < 6) {
    return {
      msg: 'Sua senha é muito curta. Mínimo de 6 carácteres',
      isError: true
    };
  }

  try {
    const { data: response } = await axios.post('http://localhost:4000/api/users', {
      name: data.name,
      email: data.email,
      password: data.password
    });

    return {
      msg: response.msg,
      isError: false
    };
  } catch (error) {
    return {
      msg: error.response.data.msg,
      isError: true
    }
  }
};

const SignUp = () => {
  const alert = useActionData();

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Criar sua conta e administrar seus{' '}
        <span className="text-slate-700">projetos</span>
      </h1>

      {alert?.msg && <Alert isError={alert?.isError}>{alert?.msg}</Alert>}

      <Form method="post" className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="name"
          >
            Nome
          </label>
          <input
            name="name"
            type="name"
            placeholder="Digite seu nome"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="name"
          />
        </div>
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
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="confirm-password"
          >
            Confirme sua senha
          </label>
          <input
            name="confirm-password"
            type="password"
            placeholder="Repita sua senha"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="confirm-password"
          />
        </div>
        <input
          type="submit"
          value="Criar conta"
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
      </nav>
    </>
  );
};

export default SignUp;
