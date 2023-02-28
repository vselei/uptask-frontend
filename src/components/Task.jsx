import { dateFormatter } from '../helpers/dateFormatter';
import useAdmin from '../hooks/useAdmin';
import useProjects from '../hooks/useProjects';

const Task = ({ task, project, setRevalidate }) => {
  const { handleEditTask, handleDeleteTaskModal, completeTask } = useProjects();
  const admin = useAdmin(project);

  const { description, priority, name, date, state } = task;
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="space-y-2 flex flex-col items-start">
        <p className="text-xl">{name}</p>
        <p className="text-sm text-gray-500 uppercase">{description}</p>
        <p className="text-sm">{dateFormatter(date)}</p>
        <p className="text-gray-600">Prioridade: {priority}</p>
        {state && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
            Completada por: {task.completed.name}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleEditTask(task)}
          >
            Editar
          </button>
        )}
        <button
          className={`${
            state ? 'bg-sky-600' : 'bg-slate-600'
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={async () => {
            await completeTask(task._id);
            setRevalidate(true);
          }}
        >
          {state ? 'Completa' : 'Incompleta'}
        </button>
        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleDeleteTaskModal(task)}
          >
            Deletar
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
