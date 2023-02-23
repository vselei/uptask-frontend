import { Form } from "react-router-dom";
import CollabForm from "../components/CollabForm";

const NewCollab = () => {
  return <>
    <h1 className="text-4xl font-black">Adicionar Collab</h1>
    <div className="mt-10 flex justify-center">
      <Form method="post" noValidate>
        <CollabForm />
      </Form>
    </div>
  </>
}

export default NewCollab;