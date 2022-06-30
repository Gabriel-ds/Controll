import { Link, useLocation } from "react-router-dom";
import Message from "../layout/Message";
import LinkButton from "../layout/LinkButton";
import Container from "../layout/Container";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

import styles from "./Projects.module.css";
import { useState, useEffect } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoader, setRemoveLoader] = useState(false);
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation();
  let message = "";

  if (location.state) message = location.state.message;
  console.log(message);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
          setRemoveLoader(true);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, []);

  const removeProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
    }).then(resp => {
      resp.json()
      console.log(resp)
    })
    .then(data => {
      setProjects(projects.filter((project) => project.id !== id))
      setProjectMessage('Projeto removido do sistema!')
    })
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h2>Meus Projetos</h2>
        <LinkButton to={"/newProject"} text={"Criar Projeto"} />
      </div>
      {message && <Message msg={message} type="success" />}
      {projectMessage && <Message msg={projectMessage} type="success" />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoader && <Loading />}
        {removeLoader && projects.length === 0 && (
          <p>Não existem projetos cadastrados</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
