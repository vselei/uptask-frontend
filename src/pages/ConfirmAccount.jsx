import { Link, useLoaderData } from 'react-router-dom';

import Alert from '../components/Alert';
import axiosClient from '../config/axiosClient';

export const loader = async ({ params }) => {
  const { id } = params;

  try {
    const url = `/users/confirm/${id}`;
    const { data } = await axiosClient(url);
    return {
      msg: data.msg,
      isError: false,
      confirm: true
    };
  } catch (error) {
    return {
      msg: error.response.data.msg,
      isError: true
    };
  }
};

const ConfirmAccount = () => {
  const alert = useLoaderData();

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirme sua conta e comece a criar seus{' '}
        <span className="text-slate-700">projetos</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alert?.msg && <Alert isError={alert?.isError}>{alert?.msg}</Alert>}
        {alert?.confirm && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Inicie sua sessão
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
