import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Project.module.css";

import Container from "../layout/Container";
import Loading from "../layout/Loading";
import Message from "../layout/Message";
import ProjectForm from "../project/ProjectForm";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectFrom, setShowProjectForm] = useState(false);
  const [messege, setMessege] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    setInterval(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, [id]);

  const editPost = (project) => {
    // validação de custo
    if(project.budget < project.cost) {
      setMessege('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false
    }
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(project)
    })
    .then((resp) => resp.json())
    .then((data) => {
      setProject(data)
      setShowProjectForm(false)
      setMessege('Projeto atualizado!')
      setType('success')
    })
    .catch((err) => console.log(err))
  }

  const toogleProjectForm = () => {
    setShowProjectForm(!showProjectFrom);
  };

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {messege ? <Message type={type} msg={messege} /> : '' }
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toogleProjectForm}>
                {!showProjectFrom ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectFrom ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span>
                    {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento: </span>R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado </span>R${project.budget}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    btnText={"Concluir edição"}
                    projectData={project}
                    handleSubmit={editPost}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
