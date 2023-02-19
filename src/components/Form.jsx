import { useParams } from 'react-router-dom';

const Form = ({ project }) => {
  const params = useParams();

  return (
    <>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sml"
          htmlFor="name"
        >
          Nome do Projeto
        </label>
        <input
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="name"
          placeholder="Nome do Projeto"
          name="name"
          defaultValue={params.id && project?.name}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sml"
          htmlFor="description"
        >
          Descrição
        </label>
        <textarea
          as="textarea"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="description"
          placeholder="Descrição do Projeto"
          name="description"
          defaultValue={params.id && project?.description}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sml"
          htmlFor="date"
        >
          Data de Entrega
        </label>
        <input
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="date"
          name="date"
          defaultValue={params.id && project?.date?.split('T')[0]}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sml"
          htmlFor="client"
        >
          Nome do Cliente
        </label>
        <input
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="client"
          placeholder="Nome do Cliente"
          name="client"
          defaultValue={params.id && project?.client}
        />
      </div>
      <input
        type="submit"
        value={params.id ? 'Editar Projeto' : 'Criar Projeto'}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </>
  );
};

export default Form;
