const CollabForm = () => {
  return (
    <>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email do Colaborador
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email do Colaborador"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
        />
      </div>
      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 p-3 w-full uppercase text-white font-bold cursor-pointer transition-colors rounded text-sm"
        value='Buscar Colaborador'
      />
    </>
  );
};

export default CollabForm;
