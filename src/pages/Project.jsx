import { useEffect, useState } from 'react';
import { Link, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Task from '../components/Task';

import TaskModal from '../components/TaskModal';
import DeleteTaskModal from '../components/DeleteTaskModal';

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
    return {
      project: data,
      params: {
        id: id
      }
    };
  } catch (error) {
    return redirect('/');
  }
};

const Project = () => {
  const [revalidate, setRevalidate] = useState(false);
  const data = useLoaderData();

  const { handleTaskModal } = useProjects();
  const navigate = useNavigate();

  useEffect(() => {
    if (revalidate) {
      navigate(`/projects/${data?.params?.id}`);
      setRevalidate(false);
    }
  }, [revalidate]);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{data?.project?.name}</h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
          <Link
            className="uppercase font-bold"
            to={`/projects/edit/${data?.params.id}`}
          >
            Editar
          </Link>
        </div>
      </div>

      <button
        onClick={handleTaskModal}
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Adicionar Tarefa
      </button>

      <p className="font-bold text-xl mt-10">Tarefas so Projeto</p>

      {!revalidate && (
        <div className="bg-white shadow mt-10 rounded-lg">
          {data?.project?.tasks?.length ? (
            data?.project?.tasks?.map(task => (
              <Task key={task._id} task={task} />
            ))
          ) : (
            <p className="text-center y-5 p-10">
              Esse projeto não possui tarefas
            </p>
          )}
        </div>
      )}

      <TaskModal setRevalidate={setRevalidate} />
      <DeleteTaskModal />
    </>
  );
};

export default Project;
