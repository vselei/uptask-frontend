import { dateFormatter } from '../helpers/dateFormatter';
import useProjects from '../hooks/useProjects';

const Task = ({ task }) => {
  const { handleTaskModal } = useProjects();

  const { description, priority, name, date, _id, state } = task;
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="space-y-2">
        <p className="text-xl">{name}</p>
        <p className="text-sm text-gray-500 uppercase">{description}</p>
        <p className="text-xl">{dateFormatter(date)}</p>
        <p className="text-gray-600">Prioridade: {priority}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleTaskModal(task)}
        >
          Editar
        </button>
        {state ? (
          <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Incompleta
          </button>
        )}
        <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
          Deletar
        </button>
      </div>
    </div>
  );
};

export default Task;
