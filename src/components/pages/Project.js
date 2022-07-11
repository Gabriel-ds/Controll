import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Project.module.css";

import Container from "../layout/Container";
import Loading from "../layout/Loading";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectFrom, setShowProjectForm] = useState(false);

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

  const toogleProjectForm = () => {
    setShowProjectForm(!showProjectFrom);
  };

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
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
                  <p>Form</p>
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
