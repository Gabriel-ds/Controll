import Input from "../form/input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function ProjectForm({btnText}) {
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
      <Select text="Selecione a categoria" name="cotegory_id"  />
      <SubmitButton text={btnText}/>
    </form>
  );
}

export default ProjectForm;
