const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Iniciar sessão e administrar seus{' '}
        <span className="text-slate-700">projetos</span>
      </h1>
      <form>
        <div>
          <label>Email</label>
          <input type={'email'} placeholder="Digite seu e-mail" className="" />
        </div>
      </form>
    </>
  );
};

export default Login;
