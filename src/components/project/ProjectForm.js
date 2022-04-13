import { useEffect, useState } from "react";

import Input from "../form/input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function ProjectForm({ btnText, handleSubmit, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {})

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

  const handleChange = (e) => {
    setProject({...project, [e.target.name]: e.target.value})
  }

  const handleCategory = (e) => {
    setProject({...project, category:{
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    }})
    console.log(categories)
  }

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
  }


  return (
    <form onSubmit={submit}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnchange={handleChange}
        value={project.name ? project.name : ''}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Orçamento total"
        handleOnchange={handleChange}
        value={project.budget ? project.budget : ''}
      />
      <Select
        text="Selecione a categoria"
        name="cotegory_id"
        options={categories}
        handleOnchange={handleCategory}
        value={project.category ? project.category.id : ''}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
