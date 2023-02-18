import { Form as Formulary } from 'react-router-dom';

const Form = () => {
  return (
    <Formulary className="bg-white py-10 px-5 md:w-1/2 rounded-lg">
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
        />
      </div>
      <input
        type="submit"
        value="Criar Projeto"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </Formulary>
  );
};

export default Form;
