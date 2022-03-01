import { useEffect, useState } from "react";

import Input from "../form/input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function ProjectForm({ btnText }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
    method: "GET",
    headers: {
      "Content-Type": "aplication/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      setCategories(data);
    })
    .catch((err) => console.log(err));
  }, [])

  return (
    <form>
      <Input
        type="text"
        text="Nome do projeto"
        name="nome"
        placeholder="Insira o nome do projeto"
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Orçamento total"
      />
      <Select
        text="Selecione a categoria"
        name="cotegory_id"
        options={categories}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
