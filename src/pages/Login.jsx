import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Iniciar sessão e administrar seus{' '}
        <span className="text-slate-700">projetos</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
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
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link className='block text-center my-5 text-slate-500 uppercase text-sm'  to='/sign-up'>
          Não tem uma conta? Cadastre-se
        </Link>
        <Link className='block text-center my-5 text-slate-500 uppercase text-sm'  to='/forgot-password'>
          Esqueceu sua senha?
        </Link>
      </nav>
    </>
  );
};

export default Login;
